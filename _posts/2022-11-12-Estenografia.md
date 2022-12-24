---
layout: post
title: "Capture the flag - esteganografía en imagenes y audio | Try Hack Me"
date: 2022-10-20
excerpt: "Solucionaremos los ejercicios propuesto por la pagina de Try Hack Me con herramientas que nos ayuden a extraer datos de imagenes y audios."
tags: [Capture The Flag]
comments: true
---
## Que es estenografía?
La esteganografía es el arte de esconder informacion, imagenes o mensajes de audios dentro de otro archivo que parece inocente a simple vista. Cualquie objeto digital puede puede tener mensajes ocultos o secretos.

Para comprender mas de la estenografia realizaremos la solucion con diferentes herramientas los ejercicios propuestos por  <A HREF="https://tryhackme.com/room/ccstego"> Try Hack Me </A>, por el momento la room del usuario se encuentra en modo privado.


### Descarga los archivos para la practica
<A HREF="https://drive.google.com/file/d/1Cv6OoQMrpFqRVTZJxeh0G6M_OJFu79Wn/view?usp=share_link"> Click para descargar los archivos</A>

## Ejercicio 1 - Imagen jpeg1

Como primer paso, es aconsaje saber el tipo de archivo que es, ya que el tipo de archivo puede ser  modificada, es decir, un archivo `png` su extension puede ser modificada aun `jpeg` o demas extensiones. 

Para saber el tipo de archivo usamos la herramienta `file`
{% highlight bash %}
─$ file jpeg1.jpeg
jpeg1.jpeg: JPEG image data, JFIF standard 1.01, aspect ratio, density 1x1, segment length 16, baseline, precision 8, 246x205, components 3
{% endhighlight %}
Al observar el resultado, efectivamente estamos con una imagen de tipo `jpeg`

Uso de `steguide`

Steghide es un programa de esteganografia que nos permite ocultar datos en imagenes o archivos de audios, es compatible con archivos `JPEG` `MBP` `WAV` y `AU`, encriptacion blowfish, hash MD5 de contraseñas.

Para instalar usamos el siguiente comando:
{% highlight bash %}
sudo apt install steghide
{% endhighlight %}

Para ver las opciones que tiene esta herramienta: `steghide --help`

Procedemos a extraer los datos
{% highlight bash %}
─$ steghide extract -sf jpeg1.jpeg 
Enter passphrase: 
{% endhighlight %}
* `extract` es para extraer los datos que tiene esta imagen 
* `-sf` seleccionamos el archivo para extraer los datos
No podemos extraer la informacion ya que nos pide una contraseña, para el descifrado de la contraseña podemos usar la herramienta `stegcracker`

StegCracker es una utilidad de fuerza bruta de esteganografía para descubrir datos ocultos dentro de archivos
{% highlight bash %}
sudo apt install stegcracker
{% endhighlight %}
Con esta herramienta hacemos fuerza bruta para obtener la contraseña

`stegcracker jpeg1.jpeg`
{% highlight bash %}
─$ stegcracker jpeg1.jpeg 
StegCracker 2.1.0 - (https://github.com/Paradoxis/StegCracker)
Copyright (c) 2022 - Luke Paris (Paradoxis)

StegCracker has been retired following the release of StegSeek, which 
will blast through the rockyou.txt wordlist within 1.9 second as opposed 
to StegCracker which takes ~5 hours.

StegSeek can be found at: https://github.com/RickdeJager/stegseek

No wordlist was specified, using default rockyou.txt wordlist.
Counting lines in wordlist..
Attacking file 'jpeg1.jpeg' with wordlist '/usr/share/wordlists/rockyou.txt'..
Successfully cracked file with password: password123
Tried 1896 passwords
Your file has been written to: jpeg1.jpeg.out
password123
{% endhighlight %}
La contraseña del archivo es `password123`, volvemos a ejecutar

`steghide extract -sf`
{% highlight bash %}
└─$ steghide extract -sf jpeg1.jpeg
Enter passphrase: 
wrote extracted data to "a.txt".
{% endhighlight %}
El resultado de la extracion es un archivo `a.txt`, vemos el contenido 

`cat a.txt`
{% highlight bash %}
pinguftw
{% endhighlight %}
¡Reto completado!

## Ejercicio 2 - Imagen png1
Para esta imagen ya no podemos usar `steghide` ya que no soporta archivos `PNG`

En este caso usamos la herramienta `zsteg`, que sirve para ver datos ocultos en archivos `PNG` y `BMP`

Instalacion:
{% highlight bash %}
sudo gem install zsteg
{% endhighlight %}

Extraemos los datos: `zsteg png1`
{% highlight bash %}
└─$ zsteg png1.png        
imagedata           .. file: DOS 2.0 backup id file, sequence 48
b1,bgr,lsb,xy       .. text: "nootnoot$"
{% endhighlight %}
Al revisar el resultado hay muchos datos ilegibles, a excepción del text `nootnoot`, siendo esta el mensaje escondido.

¡Reto completado!

## Ejercicio 2 - Imagen jpeg3
Para este ejercicio nos pide cual es el nombre del archivo `jpeg3`

Usaremos la herramienta `exiftool`, esta harramienta sirve para ver los metadatos de cualquier tipo de archivos, en los metadatos podemos encontrar diferentes tipos de informaciones como ser: desde que dispositivo se creo el archivo, hora, localización, nombre, tamaño, etc.

Instalacion
{% highlight bash %}
sudo apt install exiftool
{% endhighlight %}

Extraemos los datos `exiftool jpeg3.jpeg`
{% highlight bash %}
ExifTool Version Number         : 12.52
File Name                       : jpeg3.jpeg
Directory                       : .
File Size                       : 8.5 kB
File Modification Date/Time     : 2020:01:06 14:09:44-07:00
File Access Date/Time           : 2022:12:23 11:36:17-07:00
File Inode Change Date/Time     : 2022:12:23 09:24:25-07:00
File Permissions                : -rw-r--r--
File Type                       : JPEG
File Type Extension             : jpg
MIME Type                       : image/jpeg
JFIF Version                    : 1.01
Exif Byte Order                 : Big-endian (Motorola, MM)
Document Name                   : Hello :)
X Resolution                    : 1
Y Resolution                    : 1
Resolution Unit                 : None
Y Cb Cr Positioning             : Centered
Image Width                     : 213
Image Height                    : 160
Encoding Process                : Baseline DCT, Huffman coding
Bits Per Sample                 : 8
Color Components                : 3
Y Cb Cr Sub Sampling            : YCbCr4:2:0 (2 2)
Image Size                      : 213x160
Megapixels                      : 0.034
{% endhighlight %}
Como `Document Name` tenemos `Hello :)`, siendo la respuesta.

¡Reto completado!

## Ejercicio 3 - Imagen jpeg2
El reto es encontrar el mensaje oculto en la imagenes jpeg2

usaremos la herramienta `stegoveritas`, es una herramienta de esteganografia que soporta muchas mas tipos de archivos

**Nota** para usar la herramienta debemos tener instalado python
{: .notice}

Instalacion
{% highlight bash %}
sudo pip3 install stegoveritas

stegoveritas_install_deps
{% endhighlight %}

Extraemos los datos `stegovertias jpeg2.jpeg`
{% highlight bash %}
└─$ stegoveritas jpeg2.jpeg 
Running Module: SVImage
+------------------+------+
|   Image Format   | Mode |
+------------------+------+
| JPEG (ISO 10918) | RGB  |
+------------------+------+
+---------+------------------+-----------------------------------------------------------------------------------------------+-----------+
| Offset  | Carved/Extracted | Description                                                                                   | File Name |
+---------+------------------+-----------------------------------------------------------------------------------------------+-----------+
| 0x13736 | Carved           | LZMA compressed data, properties: 0xBE, dictionary size: 0 bytes, uncompressed size: 32 bytes | 13736.7z  |
| 0x13736 | Extracted        | LZMA compressed data, properties: 0xBE, dictionary size: 0 bytes, uncompressed size: 32 bytes | 13736     |
+---------+------------------+-----------------------------------------------------------------------------------------------+-----------+
{% endhighlight %}
Solo pondre el inicio ya que nos da muchos mas resultados.

Al terminar de extraer los datos, esta herramienta crea una carpeta donde guarda todas las extracciones de datos que hizo llamada `results`, ingresando encontraremos mucha informacióncomo la siguiente:
<figure>
        <a href="/imagenes/cc-ctf/1.png"><img src="/imagenes/cc-ctf/1.png"></a>
</figure>
Revisando archivo por archivo, hay muchos txt que solo tienen números o dirección de rutas. La respuesta se encuentra en el archivo `steghide_9b2243c171f5ac7afaf55022c626267b`, ya que es el único archivo que contiene letras.

¡Reto completado!

## Ejercicio 3 - Audio wav1.wav, wav1.wav
El siguiente ejercicio trata de espectrograma esteganografia, donde extraeremos texto del sonido usando un visualizador de sonido llamado Sonic Visualiser 

Instalacion de la herramienta 
<A HREF="https://sonicvisualiser.org/"> Descarga aqui Sonic Visualiser</A>

una vez descargado la herramienta, nos dirigimos a la carpeta de descargas  y abrimos una terminal para usar el comando

{% highlight bash %}
sudo apt install ./sonic-visualiser_4.5.1_amd64.deb
{% endhighlight %}

Abrimos la aplicación desde el buscador de kali

<figure>
        <a href="/imagenes/cc-ctf/2.png"><img src="/imagenes/cc-ctf/2.png"></a>
</figure>
Abrimos un nuevo archivo en `file` `open` y buscamos el audio wav1.wav 
<figure>
        <a href="/imagenes/cc-ctf/3.png"><img src="/imagenes/cc-ctf/3.png"></a>
</figure>
Una vez abierto el audio, el programa quedara asi
<figure>
        <a href="/imagenes/cc-ctf/4.png"><img src="/imagenes/cc-ctf/4.png"></a>
</figure>
Nos dirigimos a `Pane` en la opciones y click en `Add Spectrogram`
<figure>
        <a href="/imagenes/cc-ctf/5.png"><img src="/imagenes/cc-ctf/5.png"></a>
</figure>
Ahora ya podemos ver el contenido que hay en el audio
<figure>
        <a href="/imagenes/cc-ctf/6.png"><img src="/imagenes/cc-ctf/6.png"></a>
</figure>
Para el audio **wav2.wav**, hacemos los mismos pasos y obtendremos el siguiente texto:
<figure>
        <a href="/imagenes/cc-ctf/8.png"><img src="/imagenes/cc-ctf/8.png"></a>
</figure>

¡Reto completado!