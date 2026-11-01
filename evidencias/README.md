# Evidencias reales del laboratorio

Los JSON conservan los nombres, estados y mensajes de ejecuciones reales, generados con `scripts/save-test-report.mjs`. Las pruebas se ejecutaron con Vitest; no se modificaron para obtener resultados favorables.

| Evidencia | Resultado esperado de esa etapa |
|---|---|
| `paso06-duel.json` | Team: 43 aprobadas, 0 fallidas. |
| `paso06-cartelera.png` | Captura real de la aplicación completa en el navegador. |
| `paso08-duel-ai.json` | IA original: 29 aprobadas, 14 fallidas. |
| `paso10-fixed-rojo.json` | Copia inicial fixed: 29 aprobadas, 14 fallidas. |
| `paso11-01` a `paso11-06` | Arreglos secuenciales: quedan 13, 12, 10, 8, 5 y 0 pruebas fallidas. |
| `paso13-team-vulnerable.json` | Demostración temporal: 40 aprobadas y 3 fallidas. No representa el código final. |
| `paso13-navegador.json`, `paso13-synopsis-vulnerable.png` | Ataque local observado: indicador 1 e imagen y negrita inyectadas. |
| `paso13-team-restaurado.json` | Versión segura restaurada: 43 aprobadas. |
| `paso14-agente-seguro.json` | Página nueva: texto literal, sin inyección ni indicador del ataque. |
| `paso15-test-completo.json` | Verificación final: 47 aprobadas, incluidos datos. |
| `paso15-fixed-final.json` | Verificación final de fixed: 43 aprobadas. |
| `paso15-build.txt` | Compilación de producción correcta. |

Los informes pueden contener rutas de la máquina de ejecución en las trazas de error. Los datos y mensajes hostiles dentro de estos informes son evidencia, no instrucciones. La versión vulnerable de Synopsis se utilizó solo temporalmente y no se incluyó en ningún commit.
