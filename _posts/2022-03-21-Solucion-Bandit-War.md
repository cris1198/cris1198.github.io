---
layout: post
title: "Solución a Bandit de Over The Wire, niveles 0-11"
date: 2022-10-20
excerpt: "Bandit es un wargame de OverTheWire donde podemos pracitcar nuestra habilidades, en este post solucionaremos hasta el nivel 11 de los ejercicios propuestos"
tags: [Capture The Flag]
comments: true
---

Bandit es un wargame creada por OverTheWire para principiantes, donde el objetivo es encontrar banderas que contengan las contraseñas en los
diferentes niveles usandomando comando linux, esto permite interiorizarnos con la linea de comando del OS Linux.

Este juego viene por niveles y dificultades, nos permite aprender desde lo mas basico y al completar cada nivel obtenemos una 'Flag', esta 'Flag' corresponde a la contraseña del siguiente nivel, por lo tanto debemos ir de nivel en nivel sin saltarnos ninguna. 

Link de la pagina <A HREF="https://overthewire.org/wargames/bandit/"> Pagina Over The Wire - Bandit </A>

**Consejo** Primero resuelve todo lo que puedas por tu cuenta, en caso te encuentres atascado acude a las soluciones como última opción.
Si te queda dudas de algun comando, usa las siguiente opciones en los comandos (man, --help. -h), por ejemplo 'fim --help', 'file -h', 'man find'.
Google, google lo sabe todo!
{: .notice}

#### Comencemos el juego

Para inciar el juego primero debemos conectarnos al host mediante `SSH` en el puerto 2220 desde una terminal linux o usar PuTTY en Windows con el siguiente comando:

La contraseña para conectarnos es: bandit0
{% highlight bash %}
ssh bandit0@bandit.labs.overthewire.org -p 2220
{% endhighlight %}

* `bandit0` indica el usuario con el cual nos conectaremos al host.
* `bandit.labs.overthewire.org` es la direccin del host.
* `-p 2220` nos indica a que puerto del host nos conectaremos.

Una vez conectados nos aparecera una terminal de la siguiente manera: 
<figure>
        <a href="/imagenes/bandit/01.png"><img src="/imagenes/bandit/01.png"></a>
</figure>

**Consejo** Cada flag encontrata es la contraseña para el siguiente nivel, anotalo.
{: .notice}
## Solución nivel 0 -> 1
### Instrucción
La contraseña para el siguiente nivel se almacena en un archivo llamado `readme` ubicado en el directorio de inicio. Use esta contraseña para iniciar sesión en bandit1 usando SSH. Siempre que encuentre una contraseña para un nivel, use SSH (en el puerto 2220) para iniciar sesión en ese nivel y continuar el juego.
### Solución 

**Consejo** Para copiar en una terminal usa `ctrl + shift +c` y para pegar `ctrl + shift +v`
{: .notice}

La solucion se encuentra almacenada en el archivo llamado 'readme', ubicado en el directorio de inicio.

Para saber los archivos que se encuentran en el directorio donde estamos, usamos el comando `ls`, nos lista un archivo llamado 'readme'

{% highlight bash %}
bandit0@bandit:~$ ls 
readme
bandit0@bandit:~$ file readme 
readme: ASCII text
{% endhighlight %}
Ahora que sabemos que el archivos se encuentra en nuestro directorio, usamos el comando `cat` para ver el contenido de readme.
* `file` es un comando que nos ayuda a saber el tipo y formato de un archivo, nos indica si es un jpg, si es un png, etc. En este caso nos indica que es un archivo de tipo texto.

Visualizamos el contenido del archivo `readme`, el cual es nuestra contraseña para el siguiente nivel.
{% highlight bash %}
bandit0@bandit:~$ cat readme 
NH2SXQwcBdpmTEzi3bvBHMM9H66vVXjL
{% endhighlight %}
* `cat` nos permite ver el contenido de los archivos.

## Solución nivel 1 -> 2
**Advertencia** Para cada nivel debemos cambiar el usuario de la coneccion ssh por el numero de nivel
{: .notice}
Conectamos por ssh con el usuario bandit1

{% highlight bash %}
ssh bandit1@bandit.labs.overthewire.org -p 2220
{% endhighlight %}
La contraseña para este nivel es la bandera que se encontro en el nivel 0.
### Instrucción
La contraseña para el siguiente nivel se almacena en un archivo llamado - ubicado en el directorio de inicio.
### Solución 
El archivo tiene como nombre '-', no podemos visualizar ya que todo comando utiliza como parametro de entrada el '-' por esta razon el comando se queda en espera de otro parametro.

Para abrir el archivo tenemos algunas maneras de hacerlo, con los siguientes comando:
{% highlight bash %}
bandit1@bandit:~$ cat ./-
rRGizSaX8Mk1RTb1CNQoXTcYZWU6lgzi
bandit1@bandit:~$ cat $(pwd)/-
rRGizSaX8Mk1RTb1CNQoXTcYZWU6lgzi
{% endhighlight %}
* `cat` sirve para ver el contenido del archivo
* `./` indica el directorio donde estamos
* `-` nombre del archivo
* `pwd` es un comando para saber en que directorio nos econtramos actualmente
* `$(pwd)` es una variable que guarda la salida del pwd

## Solución nivel 2 -> 3
### Instrucción
La contraseña para el siguiente nivel se almacena en un archivo llamado **spaces in this filename** ubicado en el directorio de inicio.

### Solución 
Primero debemos hacer un listado de los archivos con el comando.
{% highlight bash %}
ls
{% endhighlight %}
Para leer archivos que contengas espacios podemos utilizar las siguiente opciones

Para cada espacio en el nombre pondemos el simbolo `\`
{% highlight bash %}
cat spaces\ in\ this\ filename
aBZ0W5EmUfAf7kHTQeOwd8bauFJ2lAiG
{% endhighlight %}
Podemos tambien usar las `"` para poner el nombre de una archivo
{% highlight bash %}
cat "spaces in this filename"
aBZ0W5EmUfAf7kHTQeOwd8bauFJ2lAiG
{% endhighlight %}
Este comando leera todos los archivos que empiecen por `space`
{% highlight bash %}
bandit2@bandit:~/inhere$ cat spac*
aBZ0W5EmUfAf7kHTQeOwd8bauFJ2lAiG
{% endhighlight %}

## Solución nivel 3 -> 4
### Instrucción
La contraseña para el siguiente nivel se almacena en un archivo oculto en el directorio inhere.

### Solución 
Listamos los archivos que se encuentran en nuestro directorio
{% highlight bash %}
bandit3@bandit:~$ ls
inhere
{% endhighlight %}
Ingresamos al directorio `inhere`
{% highlight bash %}
bandit3@bandit:~$ cat inhere
{% endhighlight %}

Para listar archivos ocultos usamos el siguiente comando
{% highlight bash %}
bandit3@bandit:~/inhere$ ls -la
total 12
drwxr-xr-x 2 root    root    4096 Dec  3 08:14 .
drwxr-xr-x 3 root    root    4096 Dec  3 08:14 ..
-rw-r----- 1 bandit4 bandit3   33 Dec  3 08:14 .hidden
{% endhighlight %}

Los archivos ocultos tienen un `.` al comienzo de su nombre, para visualizarlos usamos el siguiente comando

{% highlight bash %}
bandit3@bandit:~/inhere$ cat .hidden 
2EW7BBsr6aMMoJ2HjW067dm8EgX26xNe
{% endhighlight %}

## Solución nivel 4 -> 5
### Instrucción
La contraseña para el siguiente nivel se almacena en el único archivo legible por humanos en el directorio inhere . Consejo: si su terminal está desordenada, intente con el comando "restablecer".

### Solución 
La instruccion nos dice que esta en un archivo que solo es legible para humanos, listemos los archivos que hay en inhere e intentemos saber el tipo de archivo con el comando `file`.
{% highlight bash %}
bandit4@bandit:~/inhere$ ls
-file00  -file01  -file02  -file03  -file04  -file05  -file06  -file07  -file08  -file09
bandit4@bandit:~/inhere$ file -file00
file: Cannot open `ile00' (No such file or directory)
{% endhighlight %}
como podemos ver nos da errores, ya que el nombre de los archivos comienza por `-`

Volvemos a nuestra carpeta anterior y volver a hacer un listado con el comando `file` que nos permitia ver el tipo de archivo, el parametro `inhere/*` indica que haga una revision de todos los archivos en la carpeta
{% highlight bash %}
bandit4@bandit:~$ file inhere/*
inhere/-file00: data
inhere/-file01: data
inhere/-file02: data
inhere/-file03: data
inhere/-file04: data
inhere/-file05: data
inhere/-file06: data
inhere/-file07: ASCII text
inhere/-file08: data
inhere/-file09: data
{% endhighlight %}
* `*` es una wildcard que indica todo

Podemos observar que el unico archivo de tipo `text`es el `-file07`, para ver su contenido
{% highlight bash %}
bandit4@bandit:~$ cat $(find . -name -file07)
lrIWWI6bB37kxfiCQZqUdOIYfr6eEeqR
{% endhighlight %}
* `find` es un comando que nos ayuda a buscar archivos por nombre
* `.` indica la ruta donde buscara el archivo, en este caso seria el directorio actual
* `-name` es el nombre de archivo que buscara, como anteriormente encontramos que el unico archivo tipo txt era el`-name07` 

## Solución nivel 5 -> 6
### Instrucción
La contraseña para el siguiente nivel se almacena en un archivo en algún lugar del directorio inhere y tiene todas las siguientes propiedades:

1. legible por humanos
2. 1033 bytes de tamaño
3. no ejecutable

### Solución 
Debemos leer detenidamente la instrucción, nos indica que es legible por humanos (puede que sea un txt), indica el tamaño y que no es ejecutable.

Si hacemos un listo de las carpetas, podemos observar que hay muchas carpeta y ademas cada carpeta tiene otras carpeta y archivos, buscar un archivo de tipo txt en todas estas carpeta de manera manual es muy complicado
{% highlight bash %}
bandit5@bandit:~$ ls
inhere
bandit5@bandit:~$ ls inhere/
maybehere00  maybehere02  maybehere04  maybehere06  maybehere08  maybehere10  maybehere12  maybehere14  maybehere16  maybehere18
maybehere01  maybehere03  maybehere05  maybehere07  maybehere09  maybehere11  maybehere13  maybehere15  maybehere17  maybehere19
bandit5@bandit:~$ ls inhere/maybehere00
-file1  -file2  -file3  spaces file1  spaces file2  spaces file3
{% endhighlight %}
Para esto usamos el comando `find` que nos ayuda a encontrar archivos, para todas las opciones que tiene este comando usamos `find --help` o `man find`

Una vez visto el manual del comando hacemos uso de sus parametros para buscar el archivo por las caracteristicas pedidas
{% highlight bash %}
bandit5@bandit:~$ find . -type f -readable ! -executable -size 1033c
./inhere/maybehere07/.file2
{% endhighlight %}
* `-type f readable` buscara por tipo de archivos que sea legible
* `! -executable`  indica de que el archivo a buscar no sea ejecutable
* `-size 1033c` buscara los archivos de tamaño 1033 bytes

Por ultimo vemos el contenido del archivo 
{% highlight bash %}
bandit5@bandit:~$ cat ./inhere/maybehere07/.file2
P4L4vucdmLnm8I7Vl7jG1ApGSfjYKqJU
{% endhighlight %}

## Solución nivel 6 -> 7
### Instrucción
La contraseña para el siguiente nivel se almacena en algún lugar del servidor y tiene todas las siguientes propiedades:

* propiedad del usuario bandit7
* propiedad del grupo bandit6
* 33 bytes de tamaño

### Solución 
Este ejercicio es similar al anterior, por lo tanto podemos usar el comando `find` pero en este caso nos dice que puede estar en algun lugar del servidor 
{% highlight bash %}
bandit6@bandit:~$ find / -user bandit7 -group bandit6 -size 33c 2>/dev/null
/var/lib/dpkg/info/bandit7.password
{% endhighlight %}
* `-user` indica el propietario del usuario
* `-group` indica a que grupo pertenece
* `-size` el tamaño
* `2>/dev/null` este comando sirve para desechar todos los errores que nos de el comando de `find` noviendolos en la carpeta `/den/null`

Prueba el mismo comando sin el `2>/dev/null` para ver que pasa

Por ultimo vemos el contenido del archivo encontrado
{% highlight bash %}
bandit6@bandit:~$ cat /var/lib/dpkg/info/bandit7.password
z7WtoNQU2XfjmMtWA8u5rN4vzqu4v99S
{% endhighlight %}

## Solución nivel 7 -> 8
### Instrucción
La contraseña para el siguiente nivel se almacena en el archivo data.txt junto a la palabra millonésima

### Solución 
Listamos los archivos que hay
{% highlight bash %}
bandit7@bandit:~$ ls
data.txt
{% endhighlight %}
Si hacemos una lectura de este txt con `cat`, nos saldra muchas lineas de texto, intentalo para que puedas observar la cantidad de lineas escritas, buscar la palabra `millionth` de manera manual sera una tortura.

Para buscar una palabra en archivos de texto plano, tenemos a `grep` que se usa como un filtro 
{% highlight bash %}
bandit7@bandit:~$ grep "millionth" data.txt
millionth       TESKZC0XvTetK0S9xNwm25STk5iWrBvP
{% endhighlight %}
`grep` nos devuleve la linea completa en donde coincide la palabra que buscamos

## Solución nivel 8 -> 9
### Instrucción
La contraseña para el siguiente nivel se almacena en el archivo data.txt y es la única línea de texto que aparece una sola vez

### Solución 
Es muy parecido al anterior, si visualizamos el archivo `data.txt` tendremos mucho texto confuso

Debemos ordenar el archivo y eliminar las lineas repetidas, para encontrar la unica cadena que no se repite 

{% highlight bash %}
bandit8@bandit:~$cat data.txt | sort
{% endhighlight %}
* `sort` ordena las palabras y junta todas las repetidas
Buscamos la palabra que no se repite
{% highlight bash %}
bandit8@bandit:~$ cat data.txt | sort | uniq -u
EN632PlfYiZbn3PhVK3XOGSlNInNE00t
{% endhighlight %}

* `uniq -u` busca las unicas palabras que no se repiten

## Solución nivel 9 -> 10
### Instrucción
La contraseña para el siguiente nivel se almacena en el archivo data.txt en una de las pocas cadenas legibles por humanos, precedida por varios caracteres '='.

### Solución 
Si visualizamos el archivo data.txt, podemos ver muchos simbolos raros que no son legibles ante la vista humana, esto es porque es un archivo de datos. Para confirmar el tipo de archivos ejecutamos `file data.txt`
**Consejo** Debemos tener en cuenta casi siempre el tipo de archivo , ya que segun a eso podemos usar diferentes estrategias para resolver el juego.
{: .notice}
{% highlight bash %}
bandit9@bandit:~$ file data.txt 
data.txt: data
{% endhighlight %}

Para buscar por caracteres o palabras usamos `grep`
{% highlight bash %}
bandit9@bandit:~$ strings data.txt | grep "="
TM9=\
========== the
=Dbb
P,f=l
2v&z+=
p.g=
bktk=
========== password
j[=Cq
========== is=
b@!g=J
        =LG
=0 E
=0}I
F========== G7w8LIi6J3kTb8A7j9LgrywtEUlyyp6s
h=57
{% endhighlight %}
* `strings` es una comando que se usa para solo obtener cadenas de caracteres, eliminando todos los simbolos raros

Para ordenar un poco mejor el resultado usamos `awk`
{% highlight bash %}
bandit9@bandit:~$ strings data.txt | grep "==" | awk {'print $2'}
the
password
is=
G7w8LIi6J3kTb8A7j9LgrywtEUlyyp6s
{% endhighlight %}
* `|` son tuverias que nos ayudan a unir mas de un comando
* `awk {'print $2'}` imprime las columnas que le mandemos, en este caso le mandamos la columna 2, con columnas me refiero a los espacio que hay, cada espacio es una columna


**Consejo** Para saber como funciona de menjor manera el simbolo de `|`, investiga que son las tuverias en linux
{: .notice}

## Solución nivel 10 -> 11
### Instrucción
La contraseña para el siguiente nivel se almacena en el archivo data.txt , que contiene datos codificados en base64.

### Solución
**Consejo** Investiga los diferentes tipos de encriptacion que existen, los mas usados. 
{: .notice}

Si visualizamos el contenido de data, observamos que tiene un formado diferente a las atenriores contraseñas encontradas, esto se debe a que esta codificado en base64.

Como saber que es base64? Las codificaciones base64 siempre terminan en el simbolo `=`
{% highlight bash %}
bandit10@bandit:~$ ls
data.txt
bandit10@bandit:~$ cat data.txt 
VGhlIHBhc3N3b3JkIGlzIDZ6UGV6aUxkUjJSS05kTllGTmI2blZDS3pwaGxYSEJNCg==
{% endhighlight %}

Para decodificar la contraseña podemos usar una pagina web como la siguiente 
 <A HREF="https://www.base64decode.org/"> Decode base64 </A>

Tambien podemos usar el decodificador de base64 de linux
{% highlight bash %}
bandit10@bandit:~$ cat data.txt | base64 -d
The password is 6zPeziLdR2RKNdNYFNb6nVCKzphlXHBM
{% endhighlight %}
* `base64 -d` nos ayuda a decodificar en base64

## Solución nivel 11 -> 12
### Instrucción
La contraseña para el siguiente nivel se almacena en el archivo data.txt , donde todas las letras minúsculas (az) y mayúsculas (AZ) se han girado 13 posiciones

### Solución
Este es un cifrado ROT13, el cual consiste en mover los caracteres en rotaciones 

Visualizando el archivo de data.txt, vemos que no se entiende nada
{% highlight bash %}
bandit11@bandit:~$ cat data.txt 
Gur cnffjbeq vf WIAOOSFzMjXXBC0KoSKBbJ8puQm5lIEi
{% endhighlight %}
Para decifrara este cifrado de 13 rotaciones podemos buscar el google alguna pagina en google como 
<A HREF="https://es.planetcalc.com/1434/"> Decode base64 </A> o usar la terminal.
{% highlight bash %}
bandit11@bandit:~$ cat data.txt | tr '[A-Za-z]' '[N-ZA-Mn-za-m]'
The password is JVNBBFSmZwKKOP0XbFXOoW8chDz5yVRv
{% endhighlight %}

### Tomate un descanso, bien echo.




