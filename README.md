# React revisado por pruebas — la IA escribe, el verificador decide

Repositorio del laboratorio **extra de la semana 9** de Desarrollo de Aplicaciones Empresariales (DAE).
Complementa el laboratorio oficial de la cartelera de cine (Vite, JSX, componentes, props y listas con `map`):
aquí escribes **ocho componentes pequeños** de esa cartelera contra **pruebas automáticas**, ves cómo una IA
resuelve las mismas ocho tareas (y falla de seis maneras distintas) y llevas una copia de sus respuestas
**de rojo a verde**.

La guía del laboratorio (con su rúbrica) está en el campus virtual; aquí está el código.

> No hay estado ni hooks en este laboratorio: todo son componentes funcionales que reciben props. Eso es la semana 10.

## Estado de esta entrega

Las cinco partes de este laboratorio extra ya están realizadas en esta copia. Las instrucciones de las secciones siguientes describen el punto de partida del repositorio base; los componentes del equipo ya no están vacíos.

| Parte del README | Trabajo realizado | Evidencia |
|---|---|---|
| 1. Leer el verificador | Se revisaron las pruebas, las consultas accesibles y los avisos de React. | Desarrollo en [ENTREGABLE.md](ENTREGABLE.md). |
| 2. Escribir los ocho componentes | Los ocho componentes de `team/` reciben props y no usan estado ni hooks. Pasan las 43 pruebas del duelo. | [Pruebas actuales: 43 del duelo y 4 de datos](evidencias/readme-test.json), [captura de la cartelera](evidencias/paso06-cartelera.png). |
| 3. Duelo con la IA | Se ejecutaron las respuestas originales: 29 pruebas aprobadas y 14 fallidas, correspondientes a seis tareas defectuosas. Los seis fallos están clasificados en el entregable. | [Duelo de la IA revalidado](evidencias/readme-ai.json), pasos 8 y 9 de [ENTREGABLE.md](ENTREGABLE.md). |
| 4. Arreglar la copia | Se creó `fixed/`, se corrigió cada defecto por separado y se probó después de cada arreglo. La copia corregida pasa 43/43. | [Fixed revalidado](evidencias/readme-fixed.json), explicación de los arreglos en el paso 11 de [ENTREGABLE.md](ENTREGABLE.md). |
| 5. Datos de terceros | Se demostró localmente la ejecución XSS, se registraron las tres pruebas fallidas y se restauró Synopsis. El mensaje del agente se muestra como texto, sin ejecutar sus etiquetas. | [Demostración XSS](evidencias/paso13-navegador.json), [restauración](evidencias/paso13-team-restaurado.json), [mensaje seguro](evidencias/paso14-agente-seguro.json). |

La revisión actual confirmó **47/47 pruebas con `npm test`**, **43/43 con `npm run duel:fixed`** y [build correcto](evidencias/readme-build.txt), usando Node `v24.21.0`. Los fallos de `duel:ai` son intencionales: esa carpeta conserva las respuestas originales para analizarlas. No se modificaron las pruebas ni los datos.

`fixed/` ya contiene las correcciones: no es necesario repetir `fixed:init` ni usar `--force`, que las sobrescribiría. La implementación segura está guardada en `team/` y `fixed/`; la versión vulnerable de la demostración no se incluyó en ningún commit.

El [entregable completo](ENTREGABLE.md) registra los procedimientos, los resultados y la asistencia real de IA. La revisión personal y la entrega al campus quedan a cargo del estudiante.

## Puesta en marcha

Necesitas **Node 20 o superior** (`node --version`). En PowerShell, dentro de la carpeta del proyecto:

```powershell
npm install
npm run dev        # abre http://localhost:5173 (usa «localhost», no 127.0.0.1)
```

Al principio la pantalla muestra un error rojo: `TODO(team): write Header ...`. Es lo esperado, porque tus ocho
componentes todavía están sin escribir. Cada vez que escribas uno, el error pasa al siguiente.

## Parte 1 — Leer el verificador

Las pruebas son el oráculo: deciden si un componente está bien. Están en `src/duel/tests/`, una por tarea
(`T1-header.test.jsx` … `T8-agentmessage.test.jsx`). Léelas antes de escribir nada: dicen qué rol, qué nombre
accesible y qué texto se espera, y qué avisos de React no se aceptan. Los datos fijos están en `src/data/movies.js`.

```powershell
npm run duel       # tus componentes (src/duel/team/): al principio todo en rojo
```

## Parte 2 — Escribir los ocho componentes

Escribe cada componente en su archivo de `src/duel/team/` (hoy lanza un error `TODO(team)`). La cabecera de cada
archivo dice qué props recibe y qué debe devolver. Después de cada uno, `npm run duel`; la pantalla
(`npm run dev`) compone los ocho en `src/App.jsx`.

| Tarea | Componente | Props |
|---|---|---|
| 1 | `Header` | `name`, `links` |
| 2 | `Footer` | `contact` |
| 3 | `MovieCard` | `movie` |
| 4 | `Showtimes` | `times` |
| 5 | `MovieList` | `movies` |
| 6 | `Synopsis` | `text` |
| 7 | `Hero` | `movie` |
| 8 | `AgentMessage` | `author`, `text` |

## Parte 3 — El duelo con la IA

```powershell
npm run duel:ai    # las respuestas de una IA (src/duel/ai/): algunas pruebas fallan
```

Lee cada fallo: el nombre de la prueba dice qué se esperaba y el mensaje, qué ocurrió. Clasifica los seis fallos
(el de la tarea 1 y el de la 8 no son fallos: la IA los hizo bien).

## Parte 4 — Arreglar la copia de la IA

```powershell
npm run fixed:init   # copia src/duel/ai/ a src/duel/fixed/ (no pisa lo que ya tengas)
npm run duel:fixed   # rojo
```

Edita **solo** los archivos de `src/duel/fixed/` (nunca los de `ai/`) hasta que `npm run duel:fixed` pase entero, y
explica cada arreglo. Para empezar de cero: `npm run fixed:init -- --force`.

## Parte 5 — Datos de terceros

En `src/data/movies.js` la sinopsis de la primera película es HTML escrito por un tercero, y en `src/App.jsx` hay un
mensaje de un agente de IA con otra etiqueta `<img onerror>`. En esta parte cambias a propósito tu `Synopsis` a
`dangerouslySetInnerHTML`, ves en la consola del navegador (`window.__xss`) que el código se ejecutó, y lo
vuelves a dejar bien. La guía tiene los pasos.

## Qué hace cada script

| Script | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo de Vite con la cartelera armada con **tus** componentes (`src/duel/team/`) |
| `npm run build` | Compila la aplicación a `dist/` (comprueba que todo importa bien; no ejecuta las pruebas) |
| `npm test` | Todas las pruebas del proyecto: los datos (siempre verdes) y el duelo con **tus** componentes |
| `npm run duel` | El duelo con `src/duel/team/` (lo tuyo) |
| `npm run duel:ai` | El duelo con `src/duel/ai/` (las respuestas de la IA, de solo lectura) |
| `npm run duel:fixed` | El duelo con `src/duel/fixed/` (tu copia arreglada de la IA) |
| `npm run fixed:init` | Crea `src/duel/fixed/` copiando `ai/` |
| `npm run duel:solutions` | Solo docente: el duelo con las soluciones. Sin `teacher/` avisa de que no está disponible |

Las pruebas se ejecutan en jsdom (un navegador simulado) con Vitest y Testing Library. Cada modo (`team`, `ai`,
`fixed`, `solutions`) es un *modo de Vite*: lo elige el archivo `.env.<modo>`, que define `VITE_DUEL_SOURCE`.

## Estructura

| Ruta | Para qué |
|---|---|
| `src/duel/team/` | **Tuyo (Partes 1 y 2):** los ocho componentes sin escribir |
| `src/duel/ai/` | Las ocho respuestas de la IA. No las edites |
| `src/duel/fixed/` | **Tuyo (Parte 4):** la copia de `ai/` que arreglas (la crea `fixed:init`) |
| `src/duel/tests/` | Las pruebas, una por tarea: el verificador |
| `src/duel/support.js` | Elige el origen de los componentes y espía los avisos de la consola |
| `src/data/movies.js` | Los datos fijos: ocho películas, una sin funciones y una con sinopsis hostil |
| `src/App.jsx` | La cartelera armada con los componentes |
| `vite.config.js`, `.env.*` | Modos de Vite y configuración de Vitest |

## Convenciones del curso

Código, nombres y comentarios en inglés; explicaciones y entregables en español.
