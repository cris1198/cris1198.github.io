import headerImg from "../assets/img/headerImg.jpg";
import aboutheader from "../assets/img/aboutheader.jpg";

export const blogPosts = [
  {
    
    id: 1,
    title: "Explotacion de permisos GenericWrite en Active Directory: escalación de privilegios.",
    description: "En esta pratica de Active Directory demuestro cómo un permiso mal configurado como GenericWrite puede permitir que un usuario común escale privilegios hasta Domain Admin",
    image: headerImg,
    slug: "Active Directory",
    date: "Febrero 23, 2025",
    author: "Cristian",
    content: `
      
      <p>Utilizando herramientas como <strong>BloodHound</strong> y <strong>CrackMapExec</strong>, se analiza la enumeración del entorno, identificación de rutas de ataque y abuso de ACLs inseguras dentro de un entorno AD de laboratorio.</p>

      <hr>

      <h2>Explotando Permisos GenericWrite en Active Directory</h2>

      <p>Las configuraciones incorrectas de permisos en Active Directory representan uno de los riesgos más críticos dentro de entornos corporativos. Un permiso aparentemente “inofensivo” como <code>GenericWrite</code> puede convertirse en una vía directa para comprometer cuentas privilegiadas y obtener control total del dominio.</p>

      <p>Muchas veces estos permisos aparecen debido a:</p>

      <ul>
        <li>Herencia incorrecta de permisos.</li>
        <li>Mala administración de grupos.</li>
        <li>Delegaciones inseguras.</li>
        <li>Configuraciones rápidas donde se descuida la seguridad.</li>
        <li>Falta de auditorías en Active Directory.</li>
      </ul>

      <p>Un pequeño error de configuración puede permitir movimiento lateral, persistencia y escalación de privilegios dentro del entorno corporativo.</p>

      <hr>

      <h2>Entorno de laboratorio</h2>

      <p>Para este laboratorio se utilizó el siguiente entorno:</p>

      <ul>
        <li><strong>Kali Linux</strong> como máquina atacante.</li>
        <li><strong>Windows Server</strong> configurado con Active Directory.</li>
        <li><strong>Windows 10</strong> como cliente unido al dominio.</li>
      </ul>

      <p>En Windows Server se realizó una configuración básica de Active Directory donde se crearon:</p>

      <ul>
        <li>3 usuarios.</li>
        <li>Un grupo llamado <code>SOPORTE</code>.</li>
      </ul>

      <p><strong>imagen 1</strong></p>

      <p>Dentro del grupo <code>Admins del Dominio</code> se agregaron los grupos:</p>

      <ul>
        <li><code>SOPORTE</code></li>
        <li><code>Authenticated Users</code></li>
      </ul>

      <p>Esto se realizó desde la pestaña de <strong>Seguridad</strong>.</p>

      <p><strong>imagen 2</strong></p>

      <p>Si no puedes visualizar la pestaña de seguridad, habilita las características avanzadas desde:</p>

      <pre><code>Ver → Características avanzadas</code></pre>

      <p><strong>imagen 3</strong></p>

      <p>Una vez agregados ambos grupos, se asignaron permisos <code>GenericAll</code> o <code>GenericWrite</code>, permitiendo control total o modificación de propiedades sobre el objeto.</p>

      <p><strong>imagen 4</strong></p>

      <hr>

      <h2>Iniciando el ataque</h2>

      <p>En este escenario ya contamos con las credenciales del usuario <strong>pedro</strong>, por lo que partiremos desde ese punto.</p>

      <p>Lo primero será identificar:</p>

      <ul>
        <li>El dominio.</li>
        <li>La IP del controlador de dominio.</li>
      </ul>

      <p>Para ello utilizamos <strong>CrackMapExec</strong>:</p>

      <pre><code>crackmapexec smb &lt;IP_RED&gt; -u 'usuario' -p 'password'</code></pre>

      <p>Este comando devolverá información importante como:</p>

      <ul>
        <li>Nombre del dominio.</li>
        <li>Sistema operativo.</li>
        <li>Si el objetivo es Windows Server o un cliente.</li>
      </ul>

      <p>Por ejemplo:</p>

      <pre><code>kaizencorp.local</code></pre>

      <p>Para identificar la IP exacta del controlador de dominio utilizamos:</p>

      <pre><code>nslookup kaizencorp.local</code></pre>

      <p>Este comando devolverá la dirección IP del dominio.</p>

      <hr>

      <h2>Instalación y configuración de BloodHound</h2>

      <p>Con la información obtenida utilizaremos <strong>BloodHound</strong>, una herramienta utilizada para recolectar información de Active Directory y generar diagramas de relaciones, permisos y rutas de ataque.</p>

      <p>Instalamos BloodHound:</p>

      <pre><code>pip install bloodhound-ce</code></pre>

      <p><strong>imagen 5</strong></p>

      <p>Ahora instalamos Neo4j:</p>

      <pre><code>apt install neo4j</code></pre>

      <p>Iniciamos Neo4j:</p>

      <pre><code>neo4j console</code></pre>

      <p><strong>imagen 6</strong></p>

      <p>Una vez iniciado, las credenciales por defecto serán:</p>

      <pre><code>neo4j:neo4j</code></pre>

      <p>El sistema solicitará cambiar la contraseña.</p>

      <p><strong>imagen 7</strong></p>

      <p>La nueva contraseña debe configurarse en:</p>

      <pre><code>/etc/bhapi/bhapi.json</code></pre>

      <p><strong>imagen 8</strong></p>

      <hr>

      <h2>Enumeración del Active Directory</h2>

      <p>Con todo configurado, iniciamos la enumeración del dominio:</p>

      <pre><code>bloodhound-python -u 'pedro' -p 'password' -ns &lt;IP_AD&gt; -d kaizencorp.local -c all</code></pre>

      <p><strong>imagen 9</strong></p>

      <p>Al finalizar, la herramienta generará múltiples archivos <code>.json</code> que contienen información detallada del entorno Active Directory.</p>

      <p>Ahora iniciamos BloodHound:</p>

      <pre><code>bloodhound-start</code></pre>

      <p><strong>imagen 10</strong></p>

      <p>Las credenciales por defecto son:</p>

      <pre><code>admin:admin</code></pre>

      <p>Posteriormente subimos los archivos generados desde la opción <strong>Quick Upload</strong>.</p>

      <p><strong>imagen 11</strong></p>

      <hr>

      <h2>Identificando la ruta de ataque</h2>

      <p>En el buscador analizamos el usuario <strong>pedro</strong>, ya que contamos con sus credenciales.</p>

      <p>También podemos revisar grupos, relaciones y permisos dentro del dominio.</p>

      <p><strong>imagen 12</strong></p>

      <p>Como se observa:</p>

      <ul>
        <li>El usuario pertenece al grupo <code>Usuarios del Dominio</code>.</li>
        <li>Este grupo pertenece al grupo <code>Usuarios</code>.</li>
        <li>El grupo <code>Authenticated Users</code> también pertenece a <code>Usuarios</code>.</li>
      </ul>

      <p>Ahora analizamos el grupo <code>Admins del Dominio</code> para identificar posibles rutas de escalación de privilegios.</p>

      <p><strong>imagen 13</strong></p>

      <p>El grupo <code>Authenticated Users</code> posee permisos <code>GenericWrite</code> sobre el grupo <code>Admins del Dominio</code>.</p>

      <p>Al seleccionar la relación <code>GenericWrite</code>, BloodHound muestra posibles abusos y comandos para modificar usuarios o agregar miembros al grupo administrativo.</p>

      <hr>

      <h2>Escalación de privilegios</h2>

      <p>Ejecutamos el siguiente comando para agregar al usuario <strong>pedro</strong> al grupo administrativo:</p>

      <pre><code>net rpc group members "Admins del dominio" -U 'kaizencorp.local/pedro%password' -S &lt;IP_AD&gt;</code></pre>

      <p><strong>imagen 14</strong></p>

      <p>Con esto, el usuario <strong>pedro</strong> ya forma parte del grupo <code>Admins del Dominio</code>.</p>

      <p>Ahora comprobamos privilegios utilizando:</p>

      <pre><code>impacket-psexec KAIZENCORP/pedro:'password'@IPAD</code></pre>

      <p>Finalmente ejecutamos:</p>

      <pre><code>whoami</code></pre>

      <p>El resultado mostrará:</p>

      <pre><code>nt authority\system</code></pre>

      <p><strong>imagen 15</strong></p>

      <hr>

      <h2>¿Por qué funciona este ataque?</h2>

      <p><code>Authenticated Users</code> no es un grupo “normal” dentro de Active Directory.</p>

      <p>Se trata de un grupo especial dinámico donde automáticamente pertenece cualquier usuario autenticado del dominio.</p>

      <p>Por ejemplo:</p>

      <pre><code>cristian ∈ Authenticated Users</code></pre>

      <p>Aunque BloodHound no dibuje explícitamente:</p>

      <pre><code>cristian ---> Authenticated Users</code></pre>

      <p>Windows sí lo interpreta internamente mediante los tokens de acceso y SIDs asociados al usuario.</p>

      <p>Por esta razón, si <code>Authenticated Users</code> posee permisos <code>GenericWrite</code> sobre un objeto crítico como <code>Domain Admins</code>, cualquier usuario autenticado podría abusar de ese permiso para modificar atributos o agregarse al grupo administrativo.</p>

      <p>También se puede observar que los miembros del grupo <code>SOPORTE</code> poseen permisos para realizar modificaciones sobre el grupo administrativo, aumentando aún más la superficie de ataque.</p>

      <hr>

      <h2>Recomendaciones</h2>

      <ul>
        <li>Evitar asignar permisos <code>GenericWrite</code> o <code>GenericAll</code> sobre grupos críticos.</li>
        <li>Aplicar el principio de mínimo privilegio.</li>
        <li>Auditar regularmente permisos y ACLs en Active Directory.</li>
        <li>Utilizar BloodHound periódicamente para identificar rutas de ataque.</li>
        <li>Restringir permisos heredados innecesarios.</li>
        <li>Monitorear cambios en grupos privilegiados.</li>
        <li>Implementar soluciones SIEM para detección temprana.</li>
      </ul>

      <hr>

      <h2>Conclusión</h2>

      <p>Un único permiso mal configurado puede convertirse en una puerta de entrada para comprometer completamente un entorno Active Directory.</p>

      <p>Herramientas como BloodHound permiten visualizar fácilmente estas relaciones inseguras y comprender cómo pequeños errores administrativos pueden derivar en una escalación crítica de privilegios.</p>

      <p>La correcta administración de ACLs y grupos privilegiados es fundamental para mantener la seguridad dentro de cualquier infraestructura corporativa basada en Active Directory.</p>
    `
  },
  {
    id: 2,
    title: "123123123",
    description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem.",
    image: aboutheader,
    slug: "lorem-ipsum-2",
    date: "October 10, 2025",
    author: "Jane Smith",
    content: `
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ut justo ac lectus accumsan iaculis.</p>
      <p>Phasellus fringilla sem sit amet metus blandit, in elementum lacus sodales.</p>
      <p>Nullam sodales nisi ac elit pharetra, eget dapibus mi gravida. Suspendisse vel mauris ut felis tincidunt dictum.</p>
      <p>Fusce rhoncus turpis non dolor luctus, nec aliquet mi convallis.</p>
    `
  },
  {
    id: 3,
    title: "Ut Enim Ad Minim Veniam",
    description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    image: headerImg,
    slug: "lorem-ipsum-3",
    date: "October 2, 2025",
    author: "Alice Brown",
    content: `
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tincidunt mi non nunc imperdiet.</p>
      <p>Vestibulum in nisl ac neque sollicitudin iaculis. Suspendisse vel dignissim tortor.</p>
      <p>Etiam fringilla turpis sed magna gravida, non varius odio luctus.</p>
      <p>Nam malesuada odio sit amet purus tristique, a suscipit nulla cursus.</p>
    `
  },
  {
    id: 4,
    title: "Duis Aute Irure Dolor In Reprehenderit",
    description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=800",
    slug: "lorem-ipsum-4",
    date: "September 30, 2025",
    author: "John Doe",
    content: `
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed condimentum nunc id lorem dignissim luctus.</p>
      <p>Phasellus bibendum justo ac rhoncus aliquam, augue magna vestibulum mi.</p>
      <p>Donec laoreet ante non sem facilisis fermentum. Vivamus euismod nulla et diam faucibus.</p>
      <p>Maecenas non metus sit amet elit interdum eleifend.</p>
    `
  },
  {
    id: 5,
    title: "Excepteur Sint Occaecat Cupidatat",
    description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=800",
    slug: "lorem-ipsum-5",
    date: "September 25, 2025",
    author: "Jane Doe",
    content: `
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel libero at arcu vestibulum tempor.</p>
      <p>Praesent tincidunt justo in faucibus vulputate. Sed a est et urna gravida consequat.</p>
      <p>Nulla facilisi. Quisque cursus erat ac sapien fermentum, sed sodales lacus gravida.</p>
      <p>Morbi sagittis ligula ut tellus luctus gravida.</p>
    `
  },
  {
    id: 6,
    title: "Sed Ut Perspiciatis Unde Omnis",
    description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque.",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=800",
    slug: "lorem-ipsum-6",
    date: "September 20, 2025",
    author: "John Brown",
    content: `
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae eros sit amet justo fermentum sodales.</p>
      <p>Donec convallis nulla a posuere dictum, libero risus facilisis erat.</p>
      <p>Ut nec purus nec libero tincidunt dictum. Proin feugiat nunc sed erat sollicitudin.</p>
      <p>Morbi ut erat quis augue sodales luctus nec non risus.</p>
    `
  },
  {
    id: 7,
    title: "12121212",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
    image: "https://images.unsplash.com/photo-1559526324-593bc073d938?q=80&w=800",
    slug: "lorem-ipsum-7",
    date: "September 15, 2025",
    author: "Jane Smith",
    content: `
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tincidunt orci sit amet magna aliquam.</p>
      <p>Maecenas a elit non lacus malesuada ultrices. Donec malesuada fermentum felis non vulputate.</p>
      <p>Vestibulum efficitur magna sit amet sem egestas, id porta elit fringilla.</p>
      <p>Aliquam erat volutpat. Nunc nec lectus non nunc ullamcorper condimentum.</p>
    `
  },
  {
    id: 8,
    title: "Quis Autem Vel Eum Iure Reprehenderit",
    description: "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae.",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=800",
    slug: "lorem-ipsum-8",
    date: "September 10, 2025",
    author: "Alice Brown",
    content: `
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt arcu vel urna gravida facilisis.</p>
      <p>In in lorem id elit dignissim mattis. Aenean non purus ac arcu pulvinar posuere.</p>
      <p>Pellentesque at velit a eros egestas convallis. Integer malesuada leo in tincidunt pulvinar.</p>
      <p>Morbi sit amet nulla nec velit dapibus interdum.</p>
    `
  },
  {
    id: 9,
    title: "Temporibus Autem Quibusdam",
    description: "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet.",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=800",
    slug: "lorem-ipsum-9",
    date: "September 5, 2025",
    author: "John Doe",
    content: `
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer blandit risus in velit imperdiet luctus.</p>
      <p>Vivamus sagittis sapien sit amet sapien condimentum, vitae dignissim sem viverra.</p>
      <p>Aliquam erat volutpat. Sed in ex ac lorem viverra tincidunt.</p>
      <p>Phasellus ut eros eget lorem tempor fermentum vel id lorem.</p>
    `
  },
];
