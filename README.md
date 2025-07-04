# Alexander Bosch - Device

Para arrancar la aplicación hay que ejecutar en el terminal los siguientes comandos:
    - npm install  (para instalar las librerias)
    - npm run dev (para ejecutar la aplicación en local)
    - npm run test (para ejecutar los tests realizados)

En esta prueba técnica de programación se han realizado las siguientes funcionalidades:

- Se han creado dos paginas diferentes, una para visualizar los diferentes dispositivos y otro para visualizar los detalles de cada dispositivo
- Para cachear las llamadas y un mejor funcionamiento se ha utilizado el react-query para las llamadas y se ha guardado en el localStorage la cantidad de productos que se han añadido al carrito teniendo una caducidad de todos los datos de 1h
- Para el diseño de la aplicación se ha utilizado SCSS y se han creado un mixin de muestra para los contenedores flex y se han añadido los css para que la aplicación sea lo máximo responsive posible.
- Se ha utilizado un hook externo (useDevaunce) para el filtrado de productos para que solo filtre cuando el cliente deja de escribir.
- Se han realizado los tests de un componente y de un custoom hock de muestra

