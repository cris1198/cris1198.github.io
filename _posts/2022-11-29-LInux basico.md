---
layout: post
title: "Comandos linux"
date: 2022-11-29
excerpt: "Conoceras una gran cantidad de comando linux."
tags: [linux]
comments: true
---

Los siguientes comandos te ayudarán a tener un mejor manejo de los sistemas operativos Linux, te dejo la lista de los comandos más útiles.
## Control de tareas shell
* `jobs` Enumerar las tareas.
* `bg` Hacer que una tarea suspendida se ejecute en segundo plano.
* `fg` Anular la suspensión de una tarea: ponerlo en primer plano.

## Operaciones básicas de archivos
* `ls` Lista los archivos de un directorio.
* `cp` Copia un archivo.
* `mv` Mover y cambiar el nombre de un archivo
* `rm` Eliminar un archivo.
* `shred` Borra completamente un archivo cuando se elimina.

## Operaciones básicas de directorios
* `cd` Cambia tu directorio actual.
* `pwd` Imprime en pantalla el nombre del directorio actual.
* `basename` Imprimir en pantalla la parte final de la ruta de un archivo.
* `dirname` Imprime en pantalla la ruta de un archivo sin su parte final.
* `mkdir` Crea un directorio.
* `rmdir` Elimina un directorio vacio.
* `rm -r` Elimina un directorio que tenga contenido.

## Visualización de archivos
* `cat` Ver el contenido de un archivo en su totalidad
* `less` Ver el texto en página a la vez.
* `head`  Ver las primeras líneas de un archivo de texto.
* `tall` Ver las ultimas líneas de un archivo de texto.
* `nl` Ver archivos de texto con sus líneas numeradas.
* `strings` Mostrar el texto que está incrustado en un archivo binario.
* `od` Ver un octal u otros formatos.
* `xxd` Ver datos hexadecimales.

## Creación y edición de archivos
* `nano` Editor de texto.
* `vim` Editor de texto.
* `touch` Crear un archivo.

## Propiedades de un archivo
* `stat` Mostrar atributos de archivos y directorios.
* `wc` Contar byter, palabras, líneas de un archivo.
* `file` Identificar el tipo de archivo.
* `chgrp` Cambiar el grupo de propietario de arcihvo y directorios.
* `chmod` Cambiar permisos de archivos y directorios.

## Ubicación de archivos
* `find` Busca archivos.
* `xargs` Procesar una lista de archivos.
* `locate` Busca archivos.
* `which` Buscar la ruta de un ejecutable (comando).
* `type` Busca la ruta de un ejecutable.

## Manipulación de archivos de texto
* `grep` Busca líneas en un archivo que coincidan con una expresión regular.
* `cut` Extraer columnar de un archivo.
* `paste` Anexar columnar.
* `tr` Traducir caracteres en otros caracteres.
* `sort` Ordenar líneas de texto según varios criterios.
* `uniq` Buscar líneas idénticas en un archivo.
* `tee` Copiar un archivo e imprimirlo en una salida.

## Compresión y empaquetado de archivos
* `tar` Empaquetar varios archivos en un solo archivo.
* `gzip` Comprimir un archivo GNU zip.
* `gunzip`Descomprimir archivos zip.
* `zip` Comprimir archivos en formato Zip de Windows.
* `unzip` Descomprimir archivos en formato Zip de Windows.

## Comparación de archivos 
* `diff` Comparar línea por línea de dos archivos o directorios.
* `comm` Comparar línea por línea de dos archivos ordenados.
* `cmp` Comparar byte a byte de dos archivos.

## Discos y sistemas de archivos

* `df` Mostrar el espacio disponible en los sistemas de archivos montados.
* `mount` Hacer que una partición de disco sea accesible.
* `fsck` Verificar una partición de disco para ver si hay errores.
* `lsblk` Sincronizar todos los datos almacenados en caché en el disco,

## Copias de seguridad y almacenamiento remoto

* `rsync` Copiar un conjunto de archivos en otro dispositivo o host.

## Visualización de procesos

* `ps` Lista procesos.
* `uptime` Visualizar cuanto tiempo está funcionando el sistema.
* `w` Mostar cuantos usuarios están conectados.
* `top` Supervisar de forma interactiva los procesos que consumen muchos recursos.
* `free` Mostrar memoria libre.
* `pidof` Imprimir el PID de un proceso.

## Control de procesos

* `kill` Terminar un proceso.
* `nice` Invocar un programa.
* `renice` Cambiar la prioridad de un proceso mientras se esté ejecutando.

## Programación de tareas

* `watch` Ejecute un programa a intervalos establecidos. 
* `crontab` Programas tarea para el futuro.

## Inicios de sesión, cierres de sesión
 
* `shutdown` Apagar el sistema Linux.
* `reboot` Reiniciar un sistema Linux.

## Usuarios y su entorno

* `logname` Imprimir tu nombre de inicio de sesión.
* `whoami` Imprimir su nombre de usuario actual.
* `id` Imprimir el ID de usuario y pertenencia al grupo de un usuario.
* `who` Listar usuarios que iniciaron sesión en formato largo.
* `users` Listar usuarios que iniciaron sesión en formato corto.
* `finger` Imprimir información sobre los usuarios.
* `last` Determine cuando se conectaron los usuarios por última vez.

## Gestión de cuentas de usuario

* `useradd` Crear una cuenta de usuario.
* `userel` Eliminar una cuenta de usuario.
* `usermod` Modificar una cuenta de usuario.
* `passwdd` Cambiar contraseña.
* `chfn` Cambiar la informacion personal de un usuario.
* `su` Cambio de usuario.

## Gestión  de grupos

* `groups` Imprimir los grupos a los que pertenece el usuario. 
* `groupadd` Crear un grupo.
* `groupdel` Eliminar un grupo.
* `groupmod` Modificar un grupo.

## Información del host

* `uname` Imprimir la información básica del sistema.
* `hostanme` Imprimir el nombre del host del sistema.
* `ip` Configurar y mostrar la información de la interfaz de red.
* `ifconfig` Información de la interfaz de red.

## Ubicación del host

* `host` Buscar nombre de host, direcciones IP e información DNS. 
* `whois` Buscar los registrantes de dominios de Internet.
* `traceroute` Ver la ruta de la red a un host remoto.

## Conexiones de red

* `ssh` Iniciar sesión de forma segura en un host remoto. 
* `telnet` Iniciar sesión en un host remoto (inseguro).
* `ftp` Copiar archivos hacia / desde un host remoto.
* `sftp` Copiar archivos de forma segura desde / hacia un host remoto.

## Navegador web

* `firefox` Navegador web. 
* `wget` Descargar páginas web y archivos.