# Continuar el laboratorio en casa

> Este archivo es un resumen de continuidad de la conversación, no una exportación literal del chat ni de todas las salidas de herramientas. Conserva el contexto, decisiones, resultados y trabajo pendiente para retomar en otra computadora.

> **Solicitud posterior que reemplaza las pausas indicadas abajo:** tras entregar el enunciado completo de los 15 pasos, el estudiante pidió al asistente terminar autónomamente los pasos restantes mientras almuerza, ahorrar tokens sin bajar la calidad y hacer commit y push por cada paso. La entrega al campus la realizará el estudiante. No hay autorización docente confirmada: el paso 7 se omite y la asistencia real se registra. El paso 6 ya está implementado, con 43/43 pruebas y captura real en `evidencias/`.

## Mensaje para el próximo asistente

Estoy aprendiendo React desde cero y necesito explicaciones sencillas en español, paso a paso. Lee `ENTREGABLE.md` y este archivo antes de continuar. No completes todos los componentes de golpe: yo quiero escribirlos y aprender. Trabajamos un paso del laboratorio por vez y debes detenerte hasta que diga «siguiente». Dentro del paso 5 estamos haciendo un componente a la vez. Al guardar un avance, documenta lo realizado y las pruebas reales en `ENTREGABLE.md`, haz commit y push cuando lo solicite o al completar el paso. No inventes ejecuciones, intentos ni capturas. Registra honestamente la asistencia de IA: el paso 5 pide no usarla, pero ya la he utilizado y eso está documentado. No se ha confirmado autorización docente. No cambies las pruebas, los datos ni las respuestas originales de `src/duel/ai/`.

**Punto exacto para retomar:** el trabajo técnico del paso 5 está completado: Header, Footer, MovieCard y Showtimes aprueban sus 23 pruebas. El duelo tiene 23 pruebas aprobadas y 20 fallidas por los cuatro componentes del paso 6 aún sin implementar. El paso 6 no se ha iniciado: esperar a que diga «siguiente» para comenzar por `src/duel/team/MovieList.jsx` y guiarme para que lo escriba yo, sin darme de entrada la solución completa. La asistencia de IA del paso 5 está documentada y no se ha confirmado autorización docente.

## Repositorios y entorno

- Repositorio del equipo: https://github.com/leonel-m4/Desarrollo-de-Aplicaciones-Empresariales-LAB09
- Proyecto original: https://github.com/Hellscythe25/dae-s09-react-ia.git
- Se importaron los archivos del original en la raíz del repositorio del equipo, conservando `origin`. No se fusionó su historial de commits.
- Cuenta del equipo utilizada para los commits: `leonel-m4`, con correo noreply `leonel-m4@users.noreply.github.com`, mediante opciones locales al comando; no se cambió la identidad global de Git.
- En el equipo del aula se verificó Node `v22.17.1`.
- Proyecto React 19, Vite 7 y Vitest 3, con JavaScript y JSX.
- PowerShell bloqueaba `npm.ps1`; se utilizó `npm.cmd` sin cambiar la política de ejecución.
- La instalación informó de 3 vulnerabilidades (1 moderada, 2 críticas). No se aplicó `npm audit fix --force` ni se cambiaron dependencias para corregirlas.
- El build inicial pasó. La aplicación no puede mostrarse completa mientras haya componentes que lancen `TODO(team)`.

## Preparación en casa

Si no tienes una copia local:

```powershell
git clone https://github.com/leonel-m4/Desarrollo-de-Aplicaciones-Empresariales-LAB09.git
cd Desarrollo-de-Aplicaciones-Empresariales-LAB09
node --version
npm.cmd install
code .
npm.cmd run dev
```

Necesitas Node compatible con las dependencias instaladas; en el aula funcionó `v22.17.1`. Abre la dirección que indique Vite, normalmente http://localhost:5173. En sistemas donde no exista `npm.cmd`, usa `npm`.

Si ya tienes el repositorio, revisa `git status` antes de actualizarlo; no descartes cambios locales. Con el árbol limpio puedes ejecutar `git pull --ff-only`.

Para ejecutar las pruebas en otra terminal:

```powershell
npm.cmd run duel
```

No hacen falta extensiones de VS Code. Prettier y Auto Rename Tag se mencionaron como opcionales. Los archivos `.jsx` deben reconocerse como JavaScript React. Guarda con Ctrl + S antes de probar: una vez las pruebas fallaron porque el código correcto estaba en el chat, pero el archivo guardado todavía tenía la versión anterior.

## Recorrido de la conversación

1. Se pidió integrar el repositorio original en el repositorio vacío del equipo. Se importó, se instalaron dependencias y se comprobó el build y las pruebas.
2. Se explicó que los fallos iniciales eran esperados: los ocho componentes del equipo lanzaban excepciones `TODO(team)`.
3. Se pidió subir el proyecto con la cuenta del usuario. Se abrió GitHub primero en el navegador integrado y luego Chrome. Finalmente se pudo hacer push mediante Git a `origin/main`.
4. El usuario aportó un laboratorio de 15 pasos y pidió avanzar solo cuando dijera «siguiente».
5. Se completaron y documentaron los pasos 1 a 4. Después solicitó incluir el enunciado y desarrollo de cada paso y hacer push de los avances.
6. Al llegar al paso 5 se señaló que el enunciado pide trabajar sin IA. El usuario optó por abrir VS Code y escribir los componentes con acompañamiento; no confirmó autorización docente.
7. Se explicó que React utiliza JSX, parecido a HTML, y que los componentes son funciones que reciben props y devuelven JSX. Diferencias explicadas: `className`, etiquetas autocerradas como `<img />` y expresiones entre llaves.
8. El estudiante fue escribiendo Header. Se revisaron fragmentos y se proporcionaron ejemplos de navegación y `map`. Se corrigieron `arial-label` y la representación directa del arreglo de objetos `links`.
9. La primera ejecución compartida para Header falló porque el archivo guardado todavía contenía `<ul>{links}</ul>`. Tras guardar la versión corregida, sus cinco pruebas pasaron.
10. El usuario pidió push y luego que también se documentara. Se subieron el código y la explicación, incluyendo la asistencia real de IA. Preguntó por qué se registró; se explicó la exigencia de los pasos 5 y 15 y aceptó la explicación.
11. El estudiante escribió Footer con dirección y enlaces `tel:` y `mailto:`. Su primer fragmento omitía `return`; se le señaló cómo añadirlo. Después compartió una ejecución con las seis pruebas de Footer y las cinco de Header aprobadas. Se documentó y subió el avance.
12. Se indicó continuar con MovieCard, explicando sus requisitos sin escribir el componente completo. El estudiante empezó un `<article>` vacío.
13. Se pidió guardar el contexto del chat en GitHub para continuar en casa. Este documento atiende esa continuidad, sin afirmar que es una transcripción íntegra.
14. En casa se leyeron la documentación y el código, se repasaron los 15 pasos y se abrió VS Code. Se retomó MovieCard sin implementar automáticamente los componentes pendientes.
15. El primer comando de pruebas no pudo iniciar Vitest porque no se reconocía como comando. Se indicó instalar las dependencias con `npm.cmd install`; no se compartió la salida de instalación. Las ejecuciones posteriores ya usaron Vitest `v3.2.7`.
16. El estudiante compartió una propuesta de MovieCard sin `alt`. El asistente explicó ese atributo, detectó que el archivo guardado aún estaba vacío y después encontró el error `movie.tittle`. Se corrigió a `movie.title`, se añadieron el título y la valoración y, finalmente, la estrella que faltaba. El asistente proporcionó las líneas JSX corregidas; la asistencia no debe ocultarse.
17. Se compartieron cinco ejecuciones de pruebas durante MovieCard: 2/6, 2/6, 4/6, 4/6 y finalmente 6/6 aprobadas. La última dejó el duelo en 17 aprobadas y 26 fallidas. El asistente realizó una comprobación adicional con el mismo resultado, diferenciada de los intentos del estudiante.
18. El usuario pidió registrar el avance en GitHub. Se documentó y subió MovieCard y las ejecuciones reales en el commit `910e6ac`, dejando Showtimes como siguiente tarea pendiente en ese momento.
19. Al trabajar Showtimes, el estudiante preguntó si podía utilizar `if`. El asistente proporcionó el caso de arreglo vacío y explicó el retorno temprano. La primera ejecución compartida aprobó 3/6 pruebas: el archivo solo tenía la lista con `map`. Tras añadir el `if` antes del `return` existente, la segunda ejecución aprobó 6/6.
20. Se completó el trabajo técnico del paso 5, con 23 pruebas aprobadas y 20 fallidas. El asistente realizó una verificación adicional con el mismo resultado y documentó el cierre conforme al flujo de registrar los pasos completados. No se ha avanzado al paso 6.

## Estado de los pasos del laboratorio

### Paso 1 — Completado

Repositorio descargado/importado, Node comprobado, dependencias instaladas, servidor iniciado y navegador abierto. Error confirmado:

```text
Error: TODO(team): write Header in src/duel/team/Header.jsx
```

### Paso 2 — Completado

Se leyó `src/data/movies.js`:

- Hay 8 películas.
- `Ruta 91` (id 5) no tiene funciones: `showtimes: []`.
- `La Última Función` (id 1) tiene esta sinopsis de un tercero:

```text
Gran estreno <img src=x onerror="window.__xss=1"> <b>no te lo pierdas</b>
```

El manejador `onerror="window.__xss=1"` ejecutaría código si se interpretara como HTML y fallara la carga de la imagen. Solo se analizó; todavía no se realizó la demostración del paso 13.

### Paso 3 — Completado

`ENTREGABLE.md` contiene una tabla por prueba de Header (5) y Footer (6), con las consultas y comprobaciones exactas; también explica rol y nombre accesible, `within` y el espía de `console.error` en `src/duel/support.js`. No se modificaron las pruebas.

### Paso 4 — Completado

Se ejecutó el duelo antes de implementar componentes:

```text
Test Files  8 failed (8)
     Tests  43 failed (43)
```

El documento incluye el resumen real y un error de Header. El duelo no incluye las 4 pruebas de datos que sí ejecuta `npm test`.

### Paso 5 — Completado técnicamente, con asistencia de IA documentada

Enunciado: escribir Header, Footer, MovieCard y Showtimes, comprobando con el duelo después de cada uno. Pide no consultar IA; la asistencia utilizada está registrada y no debe ocultarse ni presentarse como trabajo sin ayuda.

| Componente | Estado | Evidencia compartida |
|---|---|---|
| Header | Implementado y subido | 5 pruebas aprobadas. Dos ejecuciones compartidas tras comenzar la implementación: una fallida y otra aprobada. |
| Footer | Implementado y subido | 6 pruebas aprobadas en la primera ejecución compartida tras implementarlo. Se corrigió antes la omisión de `return` en el chat. |
| MovieCard | Implementado y subido | 6 pruebas aprobadas. Cinco ejecuciones compartidas: cuatro parcialmente aprobadas y la última completamente aprobada. Hay una verificación adicional del asistente con el mismo resultado. |
| Showtimes | Implementado | 6 pruebas aprobadas. Dos ejecuciones compartidas: la primera con 3/6 y la segunda con 6/6 aprobadas. La verificación adicional del asistente confirmó el cierre del paso. |

Último resumen real compartido por el estudiante, tras terminar Showtimes:

```text
✓ src/duel/tests/T1-header.test.jsx (5 tests) 678ms
✓ src/duel/tests/T4-showtimes.test.jsx (6 tests) 640ms
✓ src/duel/tests/T3-moviecard.test.jsx (6 tests) 1149ms
✓ src/duel/tests/T2-footer.test.jsx (6 tests) 325ms

 Test Files  4 failed | 4 passed (8)
      Tests  20 failed | 23 passed (43)
   Start at  13:20:10
   Duration  25.35s
```

**MovieCard terminado:** recibe `movie` y devuelve un `<article>` con una imagen cuyo `src` es `movie.image` y `alt` es `movie.title`, un `<h3>` con el título y un párrafo con `★ {movie.rating}`. Es una sola película, no necesita `map`. `ENTREGABLE.md` contiene la tabla de las cinco ejecuciones compartidas y las correcciones realizadas.

**Showtimes terminado:** un `if (times.length === 0)` devuelve únicamente el párrafo «Sin funciones hoy». En el otro caso devuelve un `<ul>` con un `<li>` por horario mediante `map`; la implementación actual usa `key={index}`. El estudiante editó el archivo y el asistente proporcionó el fragmento del caso vacío. `ENTREGABLE.md` contiene las dos ejecuciones compartidas y la verificación adicional.

**Siguiente:** cuando el usuario diga «siguiente», comenzar el paso 6 por MovieList, usando su cabecera y pruebas. Continuar un componente a la vez, sin implementar automáticamente los cuatro ni dar por terminada la revisión visual o la captura de pantalla.

### Pasos 6 a 15 — Pendientes

6. Implementar MovieList, Synopsis, Hero y AgentMessage; registrar intentos reales, lograr el duelo completo en verde, verificar la interfaz y adjuntar una captura real.
7. Solo si el docente autoriza IA, pedir ocho implementaciones desde cero y guardar sus respuestas aparte para comparar. Si no hay autorización, omitir este paso. No asumir que la asistencia ya recibida equivale a esa autorización.
8. Ejecutar `npm run duel:ai`; registrar cuántas pruebas pasan y fallan y las tareas afectadas.
9. Clasificar los seis fallos de las respuestas originales de IA en una tabla: código, prueba y mensaje, y categoría ruidoso/avisa/silencioso. Explicar por qué T1 y T8 no fallan. Aún no se ejecutó esta comprobación.
10. Ejecutar `npm run fixed:init` y `npm run duel:fixed` para registrar el rojo inicial. Editar las correcciones solo en `src/duel/fixed/`, nunca en `ai/` ni en las pruebas.
11. Corregir los seis fallos uno a uno, probar después de cada arreglo, registrar cuántos fallos quedan y explicar cada causa hasta conseguir todo verde.
12. Leer las dos pruebas de MovieList con `rerender`; explicar identidad de nodos y el problema de `key={index}` al reordenar o quitar elementos, especialmente con campos editables.
13. Hacer una demostración local y temporal de Synopsis con `dangerouslySetInnerHTML`; comprobar la ejecución de `window.__xss`, registrar las tres pruebas fallidas y RESTAURAR después la implementación segura. No dejar el componente vulnerable como versión final.
14. Revisar el mensaje del agente en `src/App.jsx`, verificar que AgentMessage lo muestra como texto y que la propiedad del ataque sigue sin definir en una comprobación limpia; explicar datos no confiables y comparar escape de React con autoescape de Django y el filtro `safe`.
15. Completar tabla de uso de IA con solicitudes, respuestas y decisiones reales. Subir proyecto al repositorio y entregar el documento en el campus dentro del plazo. La entrega al campus no se ha realizado.

## Commits de referencia

| Commit | Contenido |
|---|---|
| `257d495` | Importación inicial del laboratorio. |
| `3f8a99b` | Documentación de pasos 1 y 2. |
| `9640398` | Documentación del paso 3. |
| `461cb8a` | Documentación del paso 4. |
| `1ce5321` | Implementación de Header. |
| `883620d` | Documentación del avance de Header. |
| `af087ff` | Implementación y documentación de Footer. |
| `f80c640` | Contexto para continuar en casa y borrador de MovieCard. |
| `910e6ac` | MovieCard completado y documentación de sus seis pruebas aprobadas. |

Los archivos del repositorio son la fuente de verdad para el código. `ENTREGABLE.md` conserva el desarrollo de los pasos ya trabajados; este archivo ayuda a recuperar el contexto conversacional. El nuevo asistente debe comprobar el estado actual antes de editar o ejecutar comandos.
