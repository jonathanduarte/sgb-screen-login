<h1>SGB-screen-login</h1>

<h3>Propósito</h3>

Esta pantalla sirve para controlar el ingreso de los usuarios a una aplicación.

<h3>Datos esperados</h3>

- **infoMessage** : Mensaje al usuario
- **welcomeMessage**: Mensaje de bienvenida a la aplicación
- **signUpMessage**: String que da la opción de registrarse, el string se mostraŕa y tambien otorgará la funcionalidad
- **screenTitle**: Título de la pantalla 

<h3>Parametros de la pantalla</h3>

Como se trata de una pantalla de inicio de sesión, las validaciones pueden cambiar entre cada aplicación, por lo tanto, estas validaciones se encuentran parametrizadas para que puedan cambiar dependiendo de los requerimientos. La configuración debe recibirse en los parámetros de la pantalla

- **usernameValidation**: expresión regular correspondiente a la validación del nombre de usuario
- **passwordValidation**: expresión regular correspondiente a la validación de la contraseña del usuario
- **maxAttempts**: número máximo de intentos que tiene el usuario para iniciar sesión
- **loginHandler**: en caso de que se necesite un manejador de sesión muy especifico, sino se utilizará un manejador por defecto. 
- **templateType**: función o nombre que permita identificar el template a utilizar para la pantalla
- **forgotPassword**: Booleano que indica si se quiere dar la opción al usuario de recuperar su contraseña
- **clearSubmitButtons**: Booleano que indica si se quiere colocar un botón para limpiar los campos
- **rememberMe** : Booleano que indica si se quiere colocar un toggle para que el usuario pueda mantener su sesión

<h3> Diseño </h3>

![Alt Text](https://s3.amazonaws.com/megazord-framework/balsamiq+mockups/sgb-screen-login.png)