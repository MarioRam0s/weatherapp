# Weather App - Angular

Aplicación web desarrollada en **Angular** como prueba técnica para una vacante de desarrollador **Frontend Angular**.

La aplicación permite consultar el clima actual y el pronóstico de 5 días mediante código postal, utilizando APIs externas y aplicando buenas prácticas de arquitectura, separación de responsabilidades y manejo de estado.

---

## Tecnologías Utilizadas

- Angular
- TypeScript
- Bootstrap (única librería UI utilizada)
- RxJS
- Angular Signals
- LocalStorage
- Arquitectura basada en Clean Architecture

---

## APIs Utilizadas

- Weatherbit API  
  https://www.weatherbit.io/api

- GeoNames API  
  https://www.geonames.org/

---

## Arquitectura del Proyecto

El proyecto sigue una estructura inspirada en Clean Architecture:

### Principios aplicados

- Separación clara de responsabilidades
- Repositorios definidos como abstracciones en el dominio
- Implementaciones concretas en infraestructura
- Mappers para desacoplar el modelo del API externo
- Manejo de caché con tiempo de expiración configurable
- Uso de Signals para manejo de estado reactivo

---

## Funcionalidades

- Consulta de clima actual por código postal
- Consulta de pronóstico de 5 días
- Manejo de caché en LocalStorage con expiración dinámica
- Validación para evitar peticiones HTTP innecesarias
- Interfaz completamente responsiva con Bootstrap

---

## Intalación

git clone https://github.com/MarioRam0s/weatherapp.git
npm install
ng serve -o
ng build --configuration production
