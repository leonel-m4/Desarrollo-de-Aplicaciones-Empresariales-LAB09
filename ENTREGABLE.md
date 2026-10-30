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
