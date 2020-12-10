<?php
    $dsn = 'mysql:host=localhost;dbname=db-agenda';
    $nombre_usuario = 'root';
    $contraseña = '';
    try{
        $bd = new PDO($dsn, $nombre_usuario, $contraseña);
        
    }
    catch(PDOException $e){
        
        die();
    }

    if($_POST['option'] == 'Todos')
    {
        $array = array();
        $x=0;
        $consulta=$bd->query("SELECT idContacto, nombres, apellidos, apodo, lugarTrabajo, telefono, email, direccion, foto, notas FROM contactos order by nombres");
        while($res = $consulta->fetch()){
            $array[$x]['idContacto'] = $res['idContacto'];
            $array[$x]['nombres'] = $res['nombres'];
            $array[$x]['apellidos'] = $res['apellidos'];
            $array[$x]['apodo'] = $res['apodo'];
            $array[$x]['lugarTrabajo'] = $res['lugarTrabajo'];
            $array[$x]['telefono'] = $res['telefono'];
            $array[$x]['email'] = $res['email'];
            $array[$x]['direccion'] = $res['direccion'];
            $array[$x]['foto'] = $res['foto'];
            $array[$x]['notas'] = $res['notas'];
            $x++;
        }
        echo json_encode($array);
    }

    if($_POST['option'] == 'showContact')
    {   
        $sql = "Select * from contactos where idContacto=:idContacto";
        $statement = $bd -> prepare($sql);
        $statement->bindParam(':idContacto', $_POST["idContacto"]);
        $statement->execute();

        if($statement->rowCount()>0)
        {
            echo json_encode(array('login'=> true));
        } 
        else
        {
            echo json_encode(array('login'=> false));
        }
    }

    if($_POST['option'] == 'createContact')
    {
        $sql = "insert into contactos (nombres, apellidos, apodo, lugarTrabajo, telefono, email, direccion, foto, notas ) values (:nombres, :apellidos, :apodo, :lugarTrabajo, :telefono, :email, :direccion, :foto, :notas )";
        $statement = $bd -> prepare($sql);

        $statement->bindParam(':nombres', $_POST["nombres"]);
        $statement->bindParam(':apellidos', $_POST["apellidos"]);
        $statement->bindParam(':apodo', $_POST["apodo"]);
        $statement->bindParam(':lugarTrabajo', $_POST["lugarTrabajo"]);
        $statement->bindParam(':telefono', $_POST["telefono"]);
        $statement->bindParam(':email', $_POST["email"]);
        $statement->bindParam(':direccion', $_POST["direccion"]);
        $statement->bindParam(':foto', $_POST["foto"]);
        $statement->bindParam(':notas', $_POST["notas"]);
        $statement->execute();
        echo "Creado";

    }

    if ($_POST['option']=='deleteContact'){
        $sql="delete from contactos where idContacto=:idContacto";
        $statement = $bd->prepare($sql);

        $statement->bindParam(':idContacto',$_POST["idContacto"]);
        $statement->execute();
    }

    if($_POST['option'] == 'updateContact')
    {
        $sql =  "Update contactos set nombres =:nombres, apellidos =:apellidos, apodo =:apodo, lugarTrabajo =:lugarTrabajo, telefono =:telefono, email =:email, direccion =:direccion, foto =:foto, notas =:notas  where idContacto=:idContacto";
        $statement = $bd -> prepare($sql);

        $statement->bindParam(':idContacto', $_POST["idContacto"]);
        $statement->bindParam(':nombres', $_POST["nombres"]);
        $statement->bindParam(':apellidos', $_POST["apellidos"]);
        $statement->bindParam(':apodo', $_POST["apodo"]);
        $statement->bindParam(':lugarTrabajo', $_POST["lugarTrabajo"]);
        $statement->bindParam(':telefono', $_POST["telefono"]);
        $statement->bindParam(':email', $_POST["email"]);
        $statement->bindParam(':direccion', $_POST["direccion"]);
        $statement->bindParam(':foto', $_POST["foto"]);
        $statement->bindParam(':notas', $_POST["notas"]);
        $statement->execute();
        echo "Editado";
    }



    if($_POST['option'] == 'allEvents')
    {
        $array = array();
        $x=0;
        $consulta=$bd->query("SELECT idEvento, nombre, fecha FROM eventos order by fecha");
        while($res = $consulta->fetch()){
            $array[$x]['idEvento'] = $res['idEvento'];
            $array[$x]['nombre'] = $res['nombre'];
            $array[$x]['fecha'] = $res['fecha'];

            $x++;
        }
        echo json_encode($array);
    }

    if($_POST['option'] == 'createEvent')
    {
        $sql = "insert into eventos (nombre, fecha) values (:nombre, :fecha)";
        $statement = $bd -> prepare($sql);

        $statement->bindParam(':nombre', $_POST["nombre"]);
        $statement->bindParam(':fecha', $_POST["fecha"]);

        $statement->execute();
        echo "Creado";

    }

    if ($_POST['option']=='deleteEvent'){
        $sql="delete from eventos where idEvento=:idEvento";
        $statement = $bd->prepare($sql);

        $statement->bindParam(':idEvento',$_POST["idEvento"]);
        $statement->execute();
    }

    if($_POST['option'] == 'updateEvent')
    {
        $sql =  "Update eventos set nombre =:nombre, fecha =:fecha where idEvento=:idEvento";
        $statement = $bd -> prepare($sql);

        $statement->bindParam(':idEvento', $_POST["idEvento"]);
        $statement->bindParam(':nombre', $_POST["nombre"]);
        $statement->bindParam(':fecha', $_POST["fecha"]);

        $statement->execute();
        echo "Editado";

    }

?>