# Checkin Online - Prueba Tecnica

## Comienza

1. Instala las dependencias

   ```bash
   npm install
   ```

2. Inicia la aplicación

   ```bash
   npx expo start
   ```

En la salida, encontrarás opciones para abrir la aplicación en un

- [build de desarrollo](https://docs.expo.dev/develop/development-builds/introduction/)
- [emulador de Android](https://docs.expo.dev/workflow/android-studio-emulator/)
- [simulador de iOS](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), un entorno limitado para probar el desarrollo de aplicaciones con Expo

Puedes comenzar a desarrollar editando los archivos dentro del directorio **app**. Este proyecto utiliza [enrutamiento basado en archivos](https://docs.expo.dev/router/introduction).

## Flujo del Proyecto Check-in

El flujo que sigue el proyecto es el siguiente:

1. **Revisión del Documento de Identidad (Frontal):**
   - El usuario escanea y valida el documento frontal utilizando la integración con Mindee.

2. **Revisión del Documento de Identidad (Trasero):**
   - Se repite el proceso con el escaneo y validación del documento trasero.

3. **Formulario de Información Personal:**
   - Se envían los datos al formulario personal para completar la información necesaria.

4. **Formulario de Documentación:**
   - Se envían los datos al formulario de documentación para finalizar el proceso.

5. **Fin del Proceso:**
   - Una vez completados ambos formularios, el flujo es finalizado.

## Compromisos y Decisiones de Diseño

### 1. Enrutamiento basado en archivos
Elegimos adoptar el enrutamiento basado en archivos por su simplicidad y alineación con Expo Router. Este enfoque permite:
- Una estructura de navegación clara y predecible.
- Depuración simplificada al colocar la lógica de las rutas junto con la implementación del componente.

**Compromiso:**
- Introduce limitaciones en escenarios de enrutamiento altamente dinámicos, que podrían no ser lo suficientemente flexibles para ciertos requisitos.

### 2. Context API para la Gestión de Estado
Se eligió Context API para gestionar el estado global de la aplicación (por ejemplo, ScanContext). Esta decisión permite:
- Compartir el estado fácilmente entre componentes profundamente anidados.
- Configuración mínima en comparación con bibliotecas de terceros.

**Compromiso:**
- No está optimizado para actualizaciones de alta frecuencia, lo que podría causar renderizados innecesarios en escenarios específicos.
- Podría requerir escalar en el futuro a una biblioteca de gestión de estado más sofisticada como Redux o Zustand para un mejor rendimiento.

### 3. Componente Scanner
El componente `Scanner` utiliza módulos de Expo para escanear códigos QR. Esta decisión asegura:
- Integración fluida dentro del ecosistema de Expo.
- Compatibilidad multiplataforma.

**Compromiso:**
- Depende en gran medida de la estabilidad de la API de Expo.
- Personalización limitada en comparación con implementaciones específicas de la plataforma.

### 4. Enfoque de Estilización
Hemos utilizado `StyleSheet.create` para definir los estilos. Este enfoque:
- Mejora el rendimiento al garantizar que los estilos sean inmutables.
- Fomenta definiciones de estilo modulares y reutilizables.

**Compromiso:**
- Menor flexibilidad en comparación con soluciones como CSS-in-JS.
- Falta de soporte para temas de forma predeterminada, lo que podría requerir bibliotecas adicionales en el futuro.

### 5. Manejo de Formularios con react-hook-form
El proyecto utiliza `react-hook-form` para gestionar el estado y la validación de formularios. Esta decisión se tomó debido a:
- Su excelente rendimiento al reducir renderizados innecesarios.
- Simplicidad en el manejo de formularios complejos.

**Compromiso:**
- Curva de aprendizaje para desarrolladores nuevos que no estén familiarizados con la biblioteca.

