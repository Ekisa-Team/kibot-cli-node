# **Kibot CLI**

`kibot` es una interfaz de línea de comandos que funciona como orquestador para gestionar el flujo de procesos que se dan entre [Kibot](https://github.com/Ekisa-Team/Kibot) y el middleware [Kibot.Quiron.Middleware](https://github.com/Ekisa-Team/Kibot.Quiron.Middleware).

## **Instalación**

Como requisito es necesario tener instalado el entorno de ejecución de JavaScript [NodeJS](https://nodejs.org/es/). Se recomienda instalar la versión LTS.

Instalar el CLI usando el gestor de paquetes `npm`

```bash
npm install -g @kibot/cli
```

## **Desinstalación**

```bash
npm uninstall -g @kibot/cli
```

## **Documentación**

### `Comandos principales`

- **help**: muestra ayudas sobre cualquier comando
- **check-db**: comprueba la conexión con la base de datos
- **appointments** :comando padre para gestionar citas
  - **prepare**: carga las citas en la tabla ChatbotCitas antes de ser subidas
  - **upload**: toma las citas de la tabla ChatbotCitas y las sube a la nube

## `help`

```
Usage: kibot [options] [command]

Options:
  -h, --help      display help for command

Commands:
  test-db
  appointments
  help [command]  display help for command
```

## `check-db`

```
Usage: kibot test-db [options]

Options:
  -h, --help  display help for command
```

## `appointments`

```
Usage: kibot appointments [options] [command]

Options:
  -h, --help      display help for command

Commands:
  list [options]
  prepare
  upload
  help [command]  display help for command
```

#### `list`

```
Usage: kibot appointments list [options]

Options:
  -f --format <format>  display data in JSON or Table format (default: "json")
  -h, --help            display help for command
```

#### `prepare`

```
Usage: kibot appointments prepare [options]

Options:
  -h, --help  display help for command
```

#### `upload`

```
Usage: kibot appointments upload [options]

Options:
  -h, --help  display help for command
```

### **Configuración**

La configuración del CLI se maneja a través de un archivo `JSON`

Este es un ejemplo de los parámetros que recibe.

```json
{
  "apps": {
    "quiron": {
      "client": 32,
      "database": {
        "database": "",
        "server": "",
        "user": "",
        "password": "",
        "options": {
          "trustedConnection": true,
          "trustServerCertificate": true
        }
      },
      "webhooks": {
        "uploadAppointments": "https://kibot-quiron-middleware.azurewebsites.net/api/chatbotcita/create"
      }
    }
  }
}
```

Este es un ejemplo del comando que se puede utilizar para crear el archivo.

```
kibot config create quiron --client 32 --database Quiron --server JUAN-WICK --uploadwebhook https://kibot-quiron-middleware.azurewebsites.net/api/chatbotcita/create

o más corto

kibot config create quiron --c 32 --db Quiron --s JUAN-WICK --uw https://kibot-quiron-middleware.azurewebsites.net/api/chatbotcita/create
```

## **Otros**

- Doumentación de [Kibot](https://github.com/Ekisa-Team/Kibot)
- Documentación de [Kibot.Quiron.Middleware](https://github.com/Ekisa-Team/Kibot.Quiron.Middleware)
- Documentación de [Kibot.Quiron.Listener](https://github.com/Ekisa-Team/Kibot.Quiron.Listener)
