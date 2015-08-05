SGB-screen-login

Propósito

Esta pantalla para controlar el ingreso de los usuarios a una aplicación.

Datos esperados

No se reciben datos ya que la pantalla se comunica con un servicio para resolver la solicitud de inicio de sesión

Parametrización

Como se trata de una pantalla de inicio de sesión, las validaciones pueden cambiar entre cada aplicación, por lo tanto, estas validaciones se encuentran parametrizadas para que puedan cambiar dependiendo de los requerimientos. Todos los parámetros deben recibirse como parámetros de la pantalla

usernameValidation: expresión regular correspondiente a la validación del nombre de usuario<br/>
passwordValidation: expresión regular correspondiente a la validación de la contraseña del usuario<br/>
maxAttempts: número máximo de intentos que tiene el usuario para iniciar sesión<br/>
loginHandler: en caso de que se necesite un manejador de sesión muy especifico, sino se utilizará un manejador por defecto. <br/>
	

Diseño

![Alt Text](https://s3.amazonaws.com/megazord-framework/balsamiq+mockups/sgb-screen-login.png)