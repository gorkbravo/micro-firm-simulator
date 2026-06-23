# Guion operativo: simulador de empresas dominicanas

Microeconomia I | Tecnologia, costes y decisiones contra el optimo | 2 sesiones de 2 horas | 33 alumnos

## Objetivo de la dinamica

Los equipos no reciben una funcion de produccion. Reciben una empresa dominicana simulada y un booklet con pistas. Su tarea es inferir si la tecnologia es intensiva en trabajo o capital, tomar decisiones de L y K, y comparar su resultado contra la decision optima oculta.

## Regla que tengo que decir desde el inicio

Esto no es una estimacion real de esas empresas. Son funciones didacticas inspiradas en industrias dominicanas para practicar tecnologia, maximizacion de beneficio y minimizacion de costes.

## Estructura de equipos

- 6 equipos para 33 alumnos: tres equipos de 6 y tres equipos de 5.
- Cada equipo representa una empresa: La Aurora, Induban, Central Romana, Pollo Cibao, Grupo Puntacana o Ron Barcelo/Brugal.
- Cada equipo entrega una decision por ronda. Todos calculan, pero solo se reporta una respuesta.

## Lo que recibe cada equipo

- Booklet de empresa con historia corta, descripcion productiva y pistas sobre trabajo/capital.
- Tabla historica pequena con observaciones de L, K y Q.
- Hoja de decision para anotar su conjetura de A, alpha y beta.
- Espacio para elegir L y K bajo cada ronda, incluyendo precio p y coste fijo/cuasi fijo F.

## Guion para abrir la actividad

"Hoy ustedes no van a resolver una funcion que ya les di. Van a actuar como consultores: miran una empresa, deducen su tecnologia y deciden como producir una orden al menor coste. El simulador comparara su decision con el optimo teorico, pero la funcion oficial queda oculta hasta el cierre."

## Ronda 1: mapa tecnologico de la empresa

- Material: Unidad XI, tecnologia: factores flujo, conjunto factible, isocuantas, Cobb-Douglas, RTS y rendimientos de escala.
- Objetivo: leer el booklet, clasificar la tecnologia, inferir intensidad relativa de L/K y proponer A, alpha y beta.
- Debrief: que pista apunta a trabajo, capital, complementariedad o sustitucion? Como se veria la isocuanta?
- Escenario: Q=120, w=10, r=10, p=4, F=0.

## Ronda 2: beneficio, aceptar o rechazar la orden

- Material: Unidad XII, beneficios, costes economicos, coste de oportunidad e isobeneficio.
- Objetivo: usar pi = pQ - C para decidir si la orden conviene; no basta con saber producir.
- Debrief: con p bajo y F positivo, que equipos generan beneficio? Que cambia si ignoramos coste de oportunidad?
- Escenario: Q=180, w=10, r=10, p=3.2, F=220.

## Ronda 3: isocuanta contra isocoste

- Material: Unidad XIII, minimizacion de costes: isocoste, isocuanta, demandas condicionadas y RTS = w/r.
- Objetivo: elegir L y K para cumplir Q objetivo con el menor coste posible y justificar la mezcla.
- Debrief: si el score no fue 100, fue por producir poco, gastar demasiado o no igualar RTS con w/r?
- Escenario: Q=150, w=10, r=10, p=4, F=0.

## Ronda 4: shock de precios relativos

- Material: Unidad XIII, demandas condicionadas, sustitucion y RTS decreciente.
- Objetivo: predecir antes de tocar el simulador como cambia K/L cuando el trabajo se encarece.
- Debrief: que empresas pueden sustituir trabajo por capital con menos perdida tecnica? Cuales quedan mas atrapadas?
- Escenario: Q=150, w=18, r=7, p=4, F=0.

## Ronda 5: corto plazo, coste medio y escala

- Material: Unidad XIV, curvas de costes: costes fijos, costes variables, CMe, CMg y envolvente de largo plazo.
- Objetivo: subir Q con F alto y observar como cambian C*, CMe*, beneficio y la ventaja de ajustar ambos factores.
- Debrief: el coste total sube, pero que pasa con CMe cuando se reparte F? Como conecto esto con curvas de costes?
- Escenario: Q=230, w=10, r=10, p=4, F=450.

## Ronda 6: reveal y formalizacion

- Material: cierre cronologico XI-XIV: tecnologia, beneficio, minimizacion de costes y curvas de costes.
- Objetivo: pasar a Admin mode, revelar funciones oficiales y conectar cada ronda con su condicion matematica.
- Debrief: cual fue el error conceptual mas comun: tecnologia, beneficio, precio relativo o coste medio?
- Escenario: Q=150, w=10, r=10, p=4, F=0.

## Scoring y metricas

El score mide desempeno relativo contra el coste minimo teorico:

`Score = 100 x C* / coste equivalente del equipo`

El coste equivalente ajusta la decision del equipo al Q objetivo e incorpora F. Si producen por debajo de la orden, reciben penalidad adicional por incumplimiento.

El simulador tambien muestra CMe y beneficio: `pi = pQ - C`. Usar beneficio en la ronda 2 y CMe especialmente en la ronda 5.

## Funciones oficiales ocultas

- La Aurora: Q = 8 L^0.70 K^0.30.
- Induban: Q = 10 L^0.35 K^0.65.
- Central Romana: Q = 9 L^0.40 K^0.60.
- Pollo Cibao: Q = 11 L^0.30 K^0.70.
- Grupo Puntacana: Q = 12 L^0.55 K^0.45.
- Ron Barcelo/Brugal: Q = 10 L^0.25 K^0.75.

## Checklist antes de clase

- Booklets impresos, uno por equipo.
- Una hoja de decision por equipo.
- Simulador abierto en Live mode.
- Probar Test mode antes de proyectar.
- Revisar Admin mode para comprobar funciones, L*, K* y C*.
- Tener preparada una frase para recordar que las funciones son simuladas.
- Tener una pizarra con columnas: equipo, empresa, L, K, Q, CMe, beneficio, score, explicacion.

## Uso del simulador

- Live mode: usar durante la clase; oculta funciones oficiales.
- Test mode: correr diagnostics antes de la clase y despues de tocar shocks.
- Admin mode: revisar o revelar funciones y decisiones optimas.

## Cierre que debo decir

"La tecnologia define lo que la empresa puede hacer. Los precios de factores determinan la mezcla optima. El precio del producto y los costes fijos convierten esa decision tecnica en beneficio o perdida. Si fijo el output, minimizo costes; si miro pQ - C, decido si producir conviene. Eso es exactamente lo que formaliza Varian."

