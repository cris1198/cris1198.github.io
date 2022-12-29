---
layout: post
title: "Compartir una carpeta desde Windows a Linux virtualizado"
date: 2022-10-20
excerpt: "El tener una carpeta compartida entre ambas maquinas nos permite realizar un mejor trabajo ya que todo lo que tengamos en esa carpeta sera de facil acceso por ambas partes, configurandolo con sencillos pasos."
tags: [linux]
comments: true
---

Compartir una carpeta entre la máquina Windows y una máquina virtualizada Kali Linux nos facilita mucho el trabajo al momento de compartir cualquier archivo que se encuentre en la carpeta, podemos editar, copiar, pegar, borrar, crear y entre muchas cosas.

Para configurar la carpeta compartida solo requiere de pasos muy sencillos, qué continuación lo verás.

### Paso 1
Crear una carpeta en Windows, esta será  la carpeta que se compartirá con linux.
### Paso 2
Debemos instalar la herramienta de Vmware para compartir carpetas.
{% highlight bash %}
sudo apt install open-vm-tools-desktop
{% endhighlight %}

### Paso3
1. Entramos a `Shared Folders` en  `Options` de nuestra máquina Kali.
2. Presionamos `add`.
3. Agregamos la carpeta que será compartida.

<figure>
        <a href="/imagenes/CarpetaWinLinux/2.png"><img src="/imagenes/CarpetaWinLinux/2.png"></a>
</figure>
<figure>
        <a href="/imagenes/CarpetaWinLinux/3.png"><img src="/imagenes/CarpetaWinLinux/3.png"></a>
</figure>
<figure>
        <a href="/imagenes/CarpetaWinLinux/4.png"><img src="/imagenes/CarpetaWinLinux/4.png"></a>
</figure>

### Paso 4
1. Abrimos una terminal en modo superusuario.
2. Nos dirigimos a la carpeta `/mnt`
3. Creamos una carpeta llamada 'compartiddo' o el nombre que gusten.

### Paso 5
Para montar la carpeta 'compartido' con la carpeta de Windows, debemos usar el siguiente comando.

{% highlight bash %}
mount -t fuse.vmhgfs-fuse .host:/ /mnt/compartido -o allow_other
{% endhighlight %}

**Advertencia** Si después de apagar o reiniciar la maquina la carpeta compartida desaparece, vuelve a ejecutar el comando de arriba. 
{: .notice}

#### Listo, con estos sencillos pasos ya tenemos una carpeta compartida entre ambas máquinas.

### Desmontar la carpeta
Para poder desmontar la carpeta compartida utiliza el siguiente comando.
{% highlight bash %}
umount -t fuse.vmhgfs-fuse /mnt/compartido
{% endhighlight %}

