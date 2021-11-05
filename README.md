# test-carlaonate-easylex

Se tiene dos versiones de la misma aplicación, cada una es una solución diferente al mismo problema.

## Versión 1:
Esta versión es la que esta en la rama main en donde la lógica principal es que cada cambio que se hiciera al carrito (cuando se agrega o elimina un elemento) este cambio fuera guardado en la base de datos y se regresara el carrito actualizado.
Se hizo de esta manera para poder mostrar más extensamente el manejo del backend con graphql.
Esta versión funciona correctamente, pero tiene un pequeño lag al momento de agregar o quitar un elemento del carrito.
![Version1](https://github.com/CarlaOnate/test-carlaonate-easylex/blob/main/Version1.gif)


## Versión 2: 
Esta versión hace la lógica principal del carrito en React y solo hace request al back cuando se tienen que calcular los precios y guardar ese carrito en la base de datos. El carrito se guarda solo cuando el usuario hace click en el botón de "Continuar".
En esta aplicación el tiempo de respuesta es inmeidato por lo que no cuenta con el lag de la primera versión. La mayoría de la lógica principal de esta aplicacion se hace en React por lo que aquí se muestra el conocimiento de este Framework para hacer una app sencilla. 
![Version2](https://github.com/CarlaOnate/test-carlaonate-easylex/blob/main/Version2.gif)

# Estilos:
Estas dos aplicaciones cuentan con los mismos estilos, tiene media queries para Smartphone, Tablet y Desktop.

## Smartphone
![SmartphoneImg](https://github.com/CarlaOnate/test-carlaonate-easylex/blob/main/mobileStyles.png)

## Tablet
![TabletImg](https://github.com/CarlaOnate/test-carlaonate-easylex/blob/main/tabletStyles.png)

## Desktop
![DesktopImg](https://github.com/CarlaOnate/test-carlaonate-easylex/blob/main/desktopStyles.png)
