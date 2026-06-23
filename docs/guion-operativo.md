# Guion operativo: simulador de empresas dominicanas

Microeconomia I | Tecnologia, costes y decisiones contra el optimo | 2 sesiones de 2 horas | 33 alumnos

## Objetivo de la dinamica

Los equipos no reciben una funcion de produccion. Reciben una empresa dominicana simulada y un booklet con pistas. Su tarea es inferir si la tecnologia es intensiva en trabajo o capital, tomar decisiones de ronda, elegir L y K cuando corresponda, y comparar su resultado contra la decision optima oculta.

## Regla que tengo que decir desde el inicio

Esto no es una estimacion real de esas empresas. Son funciones didacticas inspiradas en industrias dominicanas para practicar tecnologia, maximizacion de beneficio, minimizacion de costes y curvas de costes.

## Timing de rondas

- Cada ronda competitiva dura 4 minutos.
- El simulador tiene un timer visible de `04:00` con botones de Iniciar, Pausar y Reset.
- Cambiar de ronda o aplicar el escenario de ronda reinicia el timer a `04:00`.
- El profesor inicia manualmente el timer cuando los equipos ya entendieron la consigna.
- Cuando el timer llega a cero, se cierra la decision y se usa la tabla para debrief rapido.

## Estructura de equipos

- 6 equipos para 33 alumnos: tres equipos de 6 y tres equipos de 5.
- Cada equipo representa una empresa: La Aurora, Induban, Central Romana, Pollo Cibao, Grupo Puntacana o Ron Barcelo/Brugal.
- Cada equipo entrega una decision por ronda. Todos calculan, pero solo se reporta una respuesta.

## Lo que recibe cada equipo

- Booklet de empresa con historia corta, descripcion productiva y pistas sobre trabajo/capital.
- Tabla historica pequena con observaciones de L, K y Q.
- Hoja de decision para anotar su conjetura de A, alpha y beta.
- Espacio para elegir L y K bajo cada ronda, incluyendo precio p y coste fijo/cuasi fijo F.
- Espacio para marcar la decision cualitativa de cada ronda: perfil tecnologico, aceptar/rechazar, mezcla de costes, prediccion de K/L y escala.

## Guion para abrir la actividad

"Hoy ustedes no van a resolver una funcion que ya les di. Van a actuar como consultores: miran una empresa, deducen su tecnologia y deciden como producir una orden al menor coste. Cada ronda dura cuatro minutos. El simulador comparara su decision con el optimo teorico, pero la funcion oficial queda oculta hasta el cierre."

## Ronda 1: mapa tecnologico de la empresa

- Tiempo: 4 minutos.
- Material: Unidad XI, tecnologia: factores flujo, conjunto factible, isocuantas, Cobb-Douglas, RTS y rendimientos de escala.
- Decision en simulador: elegir si la empresa parece intensiva en trabajo, intensiva en capital o balanceada.
- Decision numerica: escoger un primer L y K para producir Q=120.
- Objetivo: leer el booklet, clasificar la tecnologia, inferir intensidad relativa de L/K y proponer A, alpha y beta.
- Debrief: que pista apunta a trabajo, capital, complementariedad o sustitucion? Como se veria la isocuanta?
- Escenario: Q=120, w=10, r=10, p=4, F=0.

## Ronda 2: beneficio, aceptar o rechazar la orden

- Tiempo: 4 minutos.
- Material: Unidad XII, beneficios, costes economicos, coste de oportunidad e isobeneficio.
- Decision en simulador: aceptar o rechazar la orden.
- Decision numerica: escoger L y K para la orden, estimar coste y observar beneficio.
- Objetivo: usar pi = pQ - C para decidir si la orden conviene; no basta con saber producir.
- Debrief: con p bajo y F positivo, que equipos generan beneficio? Que cambia si ignoramos coste de oportunidad?
- Escenario: Q=180, w=10, r=10, p=3.2, F=220.

## Ronda 3: isocuanta contra isocoste

- Tiempo: 4 minutos.
- Material: Unidad XIII, minimizacion de costes: isocoste, isocuanta, demandas condicionadas y RTS = w/r.
- Decision en simulador: declarar si la mezcla de minimo coste deberia moverse hacia mas L, mas K o una mezcla balanceada.
- Decision numerica: elegir L y K para cumplir Q objetivo con el menor coste posible.
- Objetivo: justificar la mezcla usando isocuanta, isocoste y precios de factores.
- Debrief: si el score no fue 100, fue por producir poco, gastar demasiado o no igualar RTS con w/r?
- Escenario: Q=150, w=10, r=10, p=4, F=0.

## Ronda 4: shock de precios relativos

- Tiempo: 4 minutos.
- Material: Unidad XIII, demandas condicionadas, sustitucion y RTS decreciente.
- Decision en simulador: predecir si K/L debe subir, bajar o quedarse casi igual cuando el trabajo se encarece y el capital se abarata.
- Decision numerica: ajustar L y K bajo el nuevo w/r.
- Objetivo: conectar precios relativos con demandas condicionadas.
- Debrief: que empresas pueden sustituir trabajo por capital con menos perdida tecnica? Cuales quedan mas atrapadas?
- Escenario: Q=150, w=18, r=7, p=4, F=0.

## Ronda 5: corto plazo, coste medio y escala

- Tiempo: 4 minutos.
- Material: Unidad XIV, curvas de costes: costes fijos, costes variables, CMe, CMg y envolvente de largo plazo.
- Decision en simulador: aceptar la orden grande, rechazarla por CMe alto o pedir recalculo de CMe.
- Decision numerica: escoger L y K con Q alto y F alto.
- Objetivo: observar como cambian C*, CMe*, beneficio y la ventaja de ajustar ambos factores cuando se reparte un coste fijo.
- Debrief: el coste total sube, pero que pasa con CMe cuando se reparte F? Como conecto esto con curvas de costes?
- Escenario: Q=230, w=10, r=10, p=4, F=450.

## Ronda 6: reveal y formalizacion

- Tiempo: no hace falta competir; usar como cierre guiado.
- Material: cierre cronologico XI-XIV: tecnologia, beneficio, minimizacion de costes y curvas de costes.
- Decision en simulador: no hay nueva decision competitiva. Pasar a Admin mode y revelar formulas oficiales.
- Objetivo: conectar cada ronda con su condicion matematica.
- Debrief: cual fue el error conceptual mas comun: tecnologia, beneficio, precio relativo o coste medio?
- Escenario: Q=150, w=10, r=10, p=4, F=0.

## Scoring, feedback y metricas

El score mide desempeno relativo contra el coste minimo teorico:

`Score = 100 x C* / coste equivalente del equipo`

El coste equivalente ajusta la decision del equipo al Q objetivo e incorpora F. Si producen por debajo de la orden, reciben penalidad adicional por incumplimiento.

El simulador tambien muestra CMe y beneficio: `pi = pQ - C`. Usar beneficio en la ronda 2 y CMe especialmente en la ronda 5.

La columna de feedback evalua la decision cualitativa de cada ronda. Por ejemplo, en ronda 2 marca si aceptar/rechazar es coherente con el beneficio esperado; en ronda 4 marca si la prediccion de K/L coincide con la logica de precios relativos. El feedback no sustituye el score de coste: sirve para el debrief conceptual.

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
- Probar que el timer se ve, inicia, pausa, resetea y vuelve a 04:00 al cambiar de ronda.
- Probar Test mode antes de proyectar.
- Revisar Admin mode para comprobar funciones, L*, K* y C*.
- Tener preparada una frase para recordar que las funciones son simuladas.
- Tener una pizarra con columnas: equipo, empresa, decision de ronda, L, K, Q, CMe, beneficio, score, explicacion.

## Uso del simulador

- Live mode: usar durante la clase; oculta funciones oficiales.
- Test mode: correr diagnostics antes de la clase y despues de tocar shocks.
- Admin mode: revisar o revelar funciones y decisiones optimas.
- Boton Iniciar: arranca los 4 minutos de trabajo de equipos.
- Boton Pausar: detiene el conteo si necesitas aclarar algo.
- Boton Reset: devuelve el timer a 04:00 sin cambiar de ronda.

## Cierre que debo decir

"La tecnologia define lo que la empresa puede hacer. Los precios de factores determinan la mezcla optima. El precio del producto y los costes fijos convierten esa decision tecnica en beneficio o perdida. Si fijo el output, minimizo costes; si miro pQ - C, decido si producir conviene. Eso es exactamente lo que formaliza Varian."
