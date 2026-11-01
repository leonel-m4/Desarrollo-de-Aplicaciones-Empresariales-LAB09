# Entregable — Laboratorio 09

## Paso 1. Preparación y error inicial

**Enunciado:** Descargar el repositorio del laboratorio, comprobar que `node --version` es 20 o superior, ejecutar `npm install` y `npm run dev`, y abrir http://localhost:5173. La pantalla mostrará un error rojo que empieza por `TODO(team)`: copiarlo, porque los ocho componentes aún no están escritos.

**Desarrollo y resultado:**

- Repositorio base importado: https://github.com/Hellscythe25/dae-s09-react-ia.git
- Repositorio del equipo: https://github.com/leonel-m4/Desarrollo-de-Aplicaciones-Empresariales-LAB09
- `node --version`: `v22.17.1`, cumple el requisito de Node 20 o superior.
- Se ejecutó `npm.cmd install` (equivalente a `npm install` en Windows, sin el bloqueo de scripts de PowerShell). Dependencias instaladas; npm informa de 3 vulnerabilidades: 1 moderada y 2 críticas.
- Se inició Vite con `npm.cmd run dev -- --host localhost` y se abrió http://localhost:5173.
- Error inicial confirmado en la consola del navegador:

```text
Error: TODO(team): write Header in src/duel/team/Header.jsx
```

Este error es esperado: `Header` todavía no está implementado y lanza una excepción. Los ocho componentes del equipo están pendientes; no se modificó su código en este paso.

## Paso 2. Lectura de los datos y sinopsis no confiable

**Enunciado:** Leer `src/data/movies.js` y anotar cuántas películas hay, cuál no tiene funciones hoy y cuál trae una sinopsis con HTML escrito por un tercero. Copiar esa sinopsis y subrayar la parte que ejecutaría código si se insertara como HTML.

**Desarrollo y resultado:**

Se leyó `src/data/movies.js` sin modificarlo. El arreglo `movies` contiene **8 películas**, con identificadores del 1 al 8:

1. La Última Función.
2. Noche en el Altiplano.
3. Código Fantasma.
4. El Jardín de Vidrio.
5. Ruta 91.
6. Mares de Ceniza.
7. Mi Vecino el Robot.
8. Medianoche en Lima.

**Película sin funciones hoy:** `Ruta 91` (id 5). Su propiedad `showtimes` es un arreglo vacío: `[]`.

**Película con HTML de un tercero:** `La Última Función` (id 1). La sinopsis exacta es:

```text
Gran estreno <img src=x onerror="window.__xss=1"> <b>no te lo pierdas</b>
```

La parte peligrosa, subrayada, es: <u><code>onerror="window.__xss=1"</code></u>.

Si se insertara esa cadena como HTML, el navegador crearía una imagen con `src=x`. Si falla su carga, ejecutaría el manejador `onerror`, cuya instrucción JavaScript `window.__xss=1` asigna el valor `1` a una propiedad global. Esa propiedad permite comprobar la ejecución del ataque XSS. La etiqueta `<b>` solo aplica negrita; no es la que ejecuta código.

En cambio, al mostrar la cadena como texto mediante `{text}`, React no la interpreta como HTML: las etiquetas se muestran literalmente y el manejador no se ejecuta. En este paso solo se analizó el dato; no se provocó el ataque ni se escribió código de componentes.

## Paso 3. Lectura de las pruebas de Header y Footer

**Enunciado:** Leer, sin escribir todavía código, las pruebas de las tareas 1 y 2 en `src/duel/tests/`. Para cada prueba anotar qué consulta usa (`getByRole`, `getByText`, `getByAltText`…) y qué comprueba. Explicar por qué consultar por rol y nombre accesible es mejor que buscar por una clase de CSS, y para qué sirve el espía que lee `console.error`.

**Desarrollo y resultado:**

Se leyeron `src/duel/tests/T1-header.test.jsx`, `src/duel/tests/T2-footer.test.jsx` y la función `watchConsole` de `src/duel/support.js`. No se modificaron componentes ni pruebas.

### Tarea 1: Header (5 pruebas)

| Nombre de la prueba | Consulta que usa | Qué comprueba |
|---|---|---|
| no produce avisos de React en la consola | Ninguna consulta del DOM; `render` y `warnings()` | Después de renderizar Header, el arreglo de mensajes capturados de `console.error` debe ser `[]`. |
| es el encabezado de la página (rol banner) | `screen.getByRole("banner")` | Que el encabezado semántico esté presente en el documento. |
| el nombre del cine es un encabezado de nivel 1 | `screen.getByRole("heading", { level: 1, name: "Cine Tecsup" })` | Que exista un encabezado de nivel 1 cuyo nombre accesible sea el nombre recibido. |
| la navegación se llama «Principal» y lista un enlace por opción | `screen.getByRole("navigation", { name: "Principal" })`; `within(nav).getByRole("list")`; `getAllByRole("listitem")` dentro de la lista; `within(items[i]).getByRole("link", { name: link.label })` | Que la navegación tenga el nombre accesible Principal y contenga una lista con tantos elementos como opciones. Cada elemento debe tener el enlace esperado, en el orden recibido, con su `href` correcto. |
| con otros datos muestra esos datos y no los del ejemplo | `screen.getByRole("heading", { level: 1, name: "Cine Norte" })`; `screen.getByRole("navigation", { name: "Principal" })`; `within(nav).getAllByRole("link")` | Que al cambiar las props aparezcan Cine Norte y los enlaces cuyos textos son Alfa y Beta, en ese orden. Comprueba que se usan las props y no datos fijos del ejemplo. Esta prueba no comprueba los `href` alternativos. |

`within(elemento)` limita las consultas a ese elemento. Por ejemplo, buscar los enlaces dentro de una opción evita confundirlos con otros enlaces de la página.

### Tarea 2: Footer (6 pruebas)

| Nombre de la prueba | Consulta que usa | Qué comprueba |
|---|---|---|
| no produce avisos de React en la consola (usa className, no class) | Ninguna consulta del DOM; `render` y `warnings()` | Que renderizar Footer no genere mensajes en `console.error`, incluido el aviso por usar `class` en lugar de `className`. |
| es el pie de la página (rol contentinfo) | `screen.getByRole("contentinfo")` | Que el pie semántico exista en el documento. |
| muestra la dirección | `screen.getByText(contact.address)` | Que la dirección recibida esté presente como texto. |
| el teléfono es un enlace tel: | `screen.getByRole("link", { name: contact.phone })` | Que el teléfono sea un enlace cuyo `href` sea exactamente `tel:` seguido del teléfono recibido. |
| el correo es un enlace mailto: | `screen.getByRole("link", { name: contact.email })` | Que el correo sea un enlace cuyo `href` sea exactamente `mailto:` seguido del correo recibido. |
| con otros datos de contacto muestra esos datos | `screen.getByText("Calle Uno 123")`; `screen.getByRole("link", { name: "+5112345678" })`; `screen.getByRole("link", { name: "otro@cine.example" })` | Que al cambiar las props se muestre la nueva dirección y los enlaces tengan `href="tel:+5112345678"` y `href="mailto:otro@cine.example"`. Evita aceptar un Footer con los datos del ejemplo escritos de forma fija. |

En estas dos tareas no se usa `getByAltText`. Las consultas son por rol, por texto o, en las pruebas de consola, no hay consulta del DOM. `render` monta el componente, pero no es una consulta.

### Por qué consultar por rol y nombre accesible

El rol expresa la función del elemento (encabezado, navegación, enlace, etc.) y el nombre accesible permite identificarlo como lo haría una persona que utiliza tecnologías de asistencia. Buscar un enlace por su nombre comprueba más que su apariencia: exige que sea reconocido como enlace y que tenga el nombre esperado.

Una clase CSS es un detalle de presentación: puede cambiar al rediseñar la página sin que cambie su comportamiento. Además, un `div` con una clase llamada `header` no se convierte por eso en un encabezado semántico. Las consultas por rol y nombre hacen las pruebas menos dependientes del estilo y ayudan a detectar problemas de accesibilidad. No sustituyen una auditoría completa de accesibilidad.

### Para qué sirve el espía de console.error

`watchConsole()` usa `vi.spyOn(console, "error").mockImplementation(() => {})`: registra las llamadas a `console.error` y evita imprimirlas mientras dura el espía. Devuelve una función que obtiene los mensajes capturados, los formatea y conserva la primera línea de cada uno. Por eso `expect(warnings()).toEqual([])` falla si React imprime algún aviso por esa vía.

Esto permite detectar problemas que pueden dejar la interfaz aparentemente correcta, como una propiedad DOM inválida (`class` en vez de `className`) o la falta de una `key`. No se limita a esos avisos: captura cualquier llamada a `console.error` durante la prueba. Tampoco captura `console.warn` ni convierte por sí mismo las excepciones en mensajes.

El espía se crea antes de cada prueba con `beforeEach` y los métodos originales se restauran después con `vi.restoreAllMocks()` en `afterEach`, evitando que una prueba contamine las siguientes. Las pruebas de consola van primero deliberadamente porque React puede emitir cada tipo de aviso solo una vez por archivo; así se comprueba el aviso desde el primer render.

## Paso 4. Ejecución inicial del duelo

**Enunciado:** Ejecutar `npm run duel` antes de escribir nada. Copiar el resumen (todas las pruebas en rojo) y el mensaje de una de ellas.

**Desarrollo y resultado:**

Se ejecutó `npm.cmd run duel`, equivalente a `npm run duel` en esta instalación de Windows. El script ejecuta `vitest run --mode team src/duel`. Los ocho componentes de `src/duel/team/` seguían sin implementar; no se modificaron antes de esta comprobación.

Resumen copiado de la ejecución (sin los colores de la terminal):

```text
 Test Files  8 failed (8)
      Tests  43 failed (43)
   Start at  15:22:56
   Duration  2.42s (transform 338ms, setup 1.67s, collect 2.44s, tests 399ms, environment 8.92s, prepare 1.80s)
```

Todas las pruebas del duelo están en rojo: **43 fallan, 0 pasan**, distribuidas en 8 archivos.

| Tarea | Componente | Pruebas fallidas |
|---|---|---|
| 1 | Header | 5 |
| 2 | Footer | 6 |
| 3 | MovieCard | 6 |
| 4 | Showtimes | 6 |
| 5 | MovieList | 5 |
| 6 | Synopsis | 5 |
| 7 | Hero | 5 |
| 8 | AgentMessage | 5 |
| **Total** | | **43** |

Ejemplo de una prueba fallida y su mensaje:

```text
FAIL src/duel/tests/T1-header.test.jsx > [team] T1 Header > es el encabezado de la página (rol banner)
Error: TODO(team): write Header in src/duel/team/Header.jsx
  at Header src/duel/team/Header.jsx:6:9
```

El fallo ocurre al intentar renderizar `Header`: su implementación inicial lanza una excepción en lugar de devolver JSX. Por eso la prueba no llega a comprobar el rol `banner`. Los demás componentes también contienen excepciones `TODO(team)`, de modo que este resultado es el punto de partida esperado del laboratorio, no un problema de instalación. El comando terminó con código de salida `1`, indicando pruebas fallidas.

Este comando solo ejecuta las pruebas del duelo; no incluye las cuatro pruebas de datos que se ejecutan con `npm test`.

## Paso 5. Componentes de las tareas 1 a 4 (en progreso)

**Enunciado:** Sin consultar a ninguna IA, escribir en `src/duel/team/` los componentes de las tareas 1 a 4 (Header, Footer, MovieCard y Showtimes), comprobando con `npm run duel` después de cada uno. La cabecera de cada archivo dice qué props recibe y qué debe devolver.

**Estado:** Header, Footer y MovieCard completados; Showtimes pendiente. El paso 5 todavía no está terminado.

### Tarea 1. Header

Se reemplazó la excepción `TODO(team)` por un componente que devuelve un `<header>`, un `<h1>` con la prop `name` y una navegación con `aria-label="Principal"`. Dentro de una lista `<ul>`, se recorre la prop `links` con `map` para crear un `<li>` por enlace. Cada elemento utiliza `key={link.href}`, y cada `<a>` recibe su destino de `link.href` y su texto de `link.label`.

**Dificultades y correcciones:** La primera ejecución compartida después de editar Header todavía utilizaba una versión guardada con `arial-label` y `<ul>{links}</ul>`. React lanzó el error siguiente porque los elementos de `links` son objetos y no se pueden mostrar directamente como contenido:

```text
Objects are not valid as a React child (found: object with keys {href, label}). If you meant to render a collection of children, use an array instead.
```

Se corrigió el atributo a `aria-label`, se transformaron los objetos en elementos JSX mediante `map` y se guardó el archivo antes de repetir las pruebas.

**Comprobación:** Se registraron dos ejecuciones de `npm.cmd run duel` compartidas por el estudiante tras comenzar la implementación de Header: una fallida y otra con sus cinco pruebas aprobadas. No se cuentan como intentos adicionales los fragmentos de código revisados en el chat sin ejecución.

Resumen de la segunda ejecución compartida:

```text
✓ src/duel/tests/T1-header.test.jsx (5 tests) 165ms

 Test Files  7 failed | 1 passed (8)
      Tests  38 failed | 5 passed (43)
   Start at  15:45:24
   Duration  2.30s (transform 230ms, setup 1.59s, collect 2.08s, tests 496ms, environment 8.20s, prepare 1.65s)
```

**Resultado:** Las cinco pruebas de Header pasan. Las otras 38 siguen fallando por los componentes pendientes. La implementación de Header se subió en el commit `1ce5321`.

**Registro de uso de IA:** Aunque el enunciado de este paso pide trabajar sin consultar a una IA, durante esta implementación se utilizó un asistente para explicar JSX, props y listas, revisar los fragmentos del estudiante, proporcionar el fragmento de navegación con `map` y diagnosticar el archivo sin guardar. El estudiante editó el archivo y ejecutó las pruebas. Por tanto, este trabajo no debe presentarse como realizado sin ayuda de IA. No se ha confirmado autorización docente para esa asistencia.

### Tarea 2. Footer

El estudiante reemplazó la excepción `TODO(team)` por un `<footer>` con un párrafo que muestra `contact.address`, un enlace con destino `tel:` seguido de `contact.phone` y otro con destino `mailto:` seguido de `contact.email`. Los textos de los enlaces también se obtienen de las props; no hay datos de contacto fijos en el componente.

**Dificultad y corrección:** El primer fragmento compartido en el chat tenía las etiquetas y los enlaces correctos, pero no incluía `return`. Sin él, la función no devolvía ese JSX. Se añadió `return (...)` antes de ejecutar la comprobación compartida.

**Intentos registrados:** Una ejecución de pruebas compartida tras implementar Footer, con sus seis pruebas aprobadas. Hubo una corrección previa en la revisión del chat (añadir `return`), pero no se aportó una ejecución fallida de esa versión; no se inventa un intento de prueba adicional.

Resumen copiado de la ejecución del estudiante:

```text
✓ src/duel/tests/T1-header.test.jsx (5 tests) 178ms
✓ src/duel/tests/T2-footer.test.jsx (6 tests) 173ms

 Test Files  6 failed | 2 passed (8)
      Tests  32 failed | 11 passed (43)
   Start at  16:00:46
   Duration  2.32s (transform 292ms, setup 1.63s, collect 2.12s, tests 651ms, environment 8.23s, prepare 1.63s)
```

**Resultado:** Header conserva sus cinco pruebas aprobadas y Footer aprueba las seis suyas. Quedan 32 pruebas en rojo correspondientes a los seis componentes todavía pendientes.

**Registro de uso de IA:** El estudiante escribió el JSX y los enlaces de Footer. El asistente explicó los requisitos y las propiedades de `contact`, revisó el fragmento y señaló la falta de `return`, indicando cómo añadirlo. El estudiante guardó el archivo y ejecutó el duelo. El asistente documentó el resultado compartido y gestionó el commit y el push. No se presenta esta tarea como realizada sin asistencia.

### Tarea 3. MovieCard

Se retomó `src/duel/team/MovieCard.jsx`, que tenía un `return` con un `<article>` vacío. El componente completado recibe una película mediante la prop `movie` y muestra una imagen con `src={movie.image}` y `alt={movie.title}`, un `<h3>` con `movie.title` y un párrafo con la estrella y la valoración: `★ {movie.rating}`. No necesita `map`, porque representa una sola película, y no utiliza títulos ni valoraciones fijos.

**Preparación en la computadora de casa:** El primer comando `npm.cmd run duel` no pudo iniciar las pruebas porque `vitest` no se reconocía como comando. El asistente indicó instalar las dependencias con `npm.cmd install`. No se compartió la salida de esa instalación; las cinco ejecuciones posteriores sí iniciaron Vitest `v3.2.7`. El comando que no pudo iniciar Vitest no se cuenta como una ejecución de pruebas.

**Dificultades y correcciones:**

- La propuesta inicial compartida en el chat no tenía `alt`; el asistente explicó su función y proporcionó la línea de imagen corregida.
- La primera ejecución de pruebas todavía usaba el archivo guardado con el `<article>` vacío. El asistente revisó el archivo e indicó guardar el código en `src/duel/team/MovieCard.jsx`, no en `ai/`.
- En una revisión posterior del archivo se encontró `movie.tittle` en lugar de `movie.title`. Esa propiedad inexistente dejaba la imagen sin un texto alternativo utilizable. También faltaban el encabezado y el párrafo de valoración.
- Tras corregir la imagen y añadir el título y la valoración, quedaban dos pruebas fallidas por una sola causa: se mostraba `4.5` o `4.9`, pero faltaba la estrella y el espacio que exigen las pruebas. Se indicó usar `<p>★ {movie.rating}</p>` y guardar antes de volver a probar.

**Intentos registrados:** El estudiante compartió cinco ejecuciones reales de `npm.cmd run duel`: cuatro con MovieCard parcialmente aprobado y una con sus seis pruebas aprobadas. No se cuentan los fragmentos revisados en el chat como ejecuciones adicionales.

| Ejecución compartida | Hora de inicio | MovieCard: aprobadas / fallidas | Duelo completo: aprobadas / fallidas | Resultado observado |
|---|---|---|---|---|
| 1 | 12:58:18 | 2 / 4 | 13 / 30 | El artículo guardado estaba vacío. |
| 2 | 13:02:01 | 2 / 4 | 13 / 30 | Había imagen, pero sin texto alternativo utilizable; faltaban título y valoración. |
| 3 | 13:04:12 | 4 / 2 | 15 / 28 | Imagen y título correctos; faltaba la estrella en la valoración. |
| 4 | 13:05:30 | 4 / 2 | 15 / 28 | La valoración guardada todavía no tenía la estrella. |
| 5 | 13:06:45 | 6 / 0 | 17 / 26 | Las seis pruebas de MovieCard pasan. |

Resumen copiado de la última ejecución compartida por el estudiante:

```text
✓ src/duel/tests/T3-moviecard.test.jsx (6 tests) 706ms
✓ src/duel/tests/T1-header.test.jsx (5 tests) 881ms
✓ src/duel/tests/T2-footer.test.jsx (6 tests) 277ms

 Test Files  5 failed | 3 passed (8)
      Tests  26 failed | 17 passed (43)
   Start at  13:06:45
   Duration  12.51s (transform 640ms, setup 6.53s, collect 7.17s, tests 2.79s, environment 31.71s, prepare 5.09s)
```

**Verificación adicional del asistente antes de registrar el avance:** Se ejecutó otra vez `npm.cmd run duel`, con las opciones `--reporter=json` y `--outputFile` para guardar el informe fuera del repositorio, en la carpeta temporal de OpenCode. El informe confirmó Header 5/5, Footer 6/6 y MovieCard 6/6: **17 pruebas aprobadas y 26 fallidas**, en 3 archivos aprobados y 5 fallidos. El comando terminó con código de salida `1` por los componentes pendientes. Esta comprobación se distingue de las cinco ejecuciones compartidas por el estudiante y no se cuenta como un intento suyo.

**Resultado:** MovieCard está completado. Los 26 fallos restantes corresponden a Showtimes (6), MovieList (5), Synopsis (5), Hero (5) y AgentMessage (5), que siguen con sus excepciones `TODO(team)`. Para terminar el paso 5 falta únicamente Showtimes; los otros cuatro componentes corresponden al paso 6. No se modificaron las pruebas, los datos ni las respuestas originales de `src/duel/ai/`.

**Registro de uso de IA:** El estudiante compartió una propuesta de componente, editó y guardó el archivo y ejecutó las pruebas. El asistente explicó los requisitos, revisó el código y las salidas, diagnosticó el archivo sin guardar y el error `tittle`, y proporcionó las líneas JSX corregidas para imagen, título y valoración. También abrió VS Code, realizó la verificación adicional y documentó el avance para subirlo a GitHub a petición del estudiante. No se presenta esta tarea como realizada sin asistencia de IA; sigue sin confirmarse autorización docente.
