# Guía de Exposición y Speech — Tema III (Versión Directa: 4 Slides)

**Presentación:** `presentacion_prueba_t_rlm/index.html`  
**Duración estimada:** 3 a 4 minutos (solo teoría esencial; tu compañero continúa con la prueba $F$ y el ejemplo práctico).  
**Atajos útiles:**
- `→` o `Espacio`: Siguiente slide
- `←`: Slide anterior
- `F`: Pantalla completa
- `T`: Cambiar tema visual (`Cuaderno` → `Sobrio Claro` → `Pizarra de Aula` → `Cyber Dark`)

---

## Slide 1: Portada General *(~25 seg)*

### Qué debes hacer
- Abre `index.html` y presiona `F` para ponerlo en pantalla completa.
- Si deseas cambiar el diseño visual para el proyector, presiona `T`.

### Qué debes decir
> *"Buenos días/noches con todos, estimado docente y compañeros. A nuestro equipo le tocó desarrollar el **Tema III: Prueba t de Student y la Prueba F de Fisher en Regresión Lineal Múltiple**.*
>
> *En esta primera parte, yo les explicaré de forma concreta la **teoría de la prueba t de Student**: para qué sirve, cómo se calcula y cómo se toma la decisión, antes de pasar a la prueba F y al ejemplo práctico."*

---

## Slide 2: ¿Qué evalúa la Prueba t en Regresión Múltiple? *(~1 min)*

### Qué debes hacer
- Avanza a la **Slide 2** (`→`).
- Señala primero la columna izquierda (*Ceteris Paribus*) y luego la columna derecha ($H_0$ vs $H_1$).

### Qué debes decir
> *"Cuando tenemos un modelo con varias variables ($X_1, X_2, \dots, X_k$), la prueba $t$ sirve para evaluar la **significancia individual** de cada variable por separado. Es decir, responde a la pregunta: **¿esta variable realmente aporta a explicar $Y$, o su coeficiente salió distinto de cero por puro azar de la muestra?***
>
> *Aquí hay una regla de oro llamada **ceteris paribus**: la prueba $t$ mide el aporte propio de una variable **manteniendo constantes todas las demás variables del modelo**. Por eso, una variable puede parecer importante por sí sola, pero dejar de serlo cuando ya controlamos por otras.*
>
> *Sus hipótesis son muy simples:*
> - ***Hipótesis nula ($H_0: \beta_j = 0$):** la variable **no** aporta linealmente al modelo.*
> - ***Hipótesis alternativa ($H_1: \beta_j \neq 0$):** la variable **sí** aporta de forma significativa."*

---

## Slide 3: Fórmula y Regla de Decisión *(~1.5 min)*

### Qué debes hacer
1. Avanza a la **Slide 3** (`→`).
2. Explica brevemente la fórmula de la izquierda (*Señal vs. Ruido*).
3. En la gráfica interactiva de la derecha, haz clic en **`0.05`** y luego en **`0.01`**, y mueve un poco el deslizador **`t_calc`** para que la clase vea cómo entra o sale de la zona roja.

### Qué debes decir
> *"¿Cómo se calcula? Con una división muy intuitiva entre **Señal** y **Ruido**: el coeficiente estimado $\hat{\beta}_j$ dividido entre su Error Estándar $EE(\hat{\beta}_j)$.*
>
> *Usamos la distribución **t de Student** con $gl = n - k - 1$ grados de libertad porque no conocemos la varianza real de la población y la estimamos con los datos.*
>
> *Para decidir si rechazamos $H_0$, tenemos dos caminos equivalentes:*
> 1. *Comparar nuestro $|t_{\text{calc}}|$ contra el valor crítico: si cae en las colas rojas, rechazamos $H_0$.*
> 2. *O de forma práctica en software: si el **$p$-valor es menor que $\alpha$** (por ejemplo, $p < 0.05$), rechazamos $H_0$.*
>
> **[Mueve el slider de $t_{\text{calc}}$ y cambia de $\alpha = 0.05$ a $\alpha = 0.01$]**
> *Por ejemplo, aquí vemos que un $t = 2.20$ sí rechaza $H_0$ con $\alpha = 0.05$ (porque supera el umbral de $2.04$), pero si somos más exigentes con $\alpha = 0.01$, el umbral sube a $2.75$ y ya no alcanza para rechazar."*

---

## Slide 4: 3 Puntos Clave y Puente hacia la Prueba F *(~1 min)*

### Qué debes hacer
- Avanza a la **Slide 4** (`→`).
- Resume las 3 tarjetas superiores y cierra señalando el recuadro inferior para darle el pase a tu compañero.

### Qué debes decir
> *"Para cerrar la parte teórica, quiero dejar 3 ideas clave que siempre debemos recordar:*
> 1. ***No significancia no significa efecto cero:** si una variable da $p > 0.05$, puede ser por muestra pequeña o por multicolinealidad (variables repetidas entre sí).*
> 2. ***Significancia estadística no es relevancia práctica:** con muchos datos, un efecto minúsculo puede salir significativo.*
> 3. ***Evalúa de una en una:** la prueba $t$ solo analiza cada variable por separado.*
>
> *Por eso, para saber si **todo el modelo en conjunto** es válido, necesitamos la **Prueba F de Fisher**. Con esto le doy pase a mi compañero/a para continuar con la prueba F y el ejemplo práctico. ¡Muchas gracias!"*
