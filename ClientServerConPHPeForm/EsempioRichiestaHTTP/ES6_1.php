<?php
    $ricerca = $_POST["ricerca"];
    $dsn = "mysql:hostname=localhost;port=3306;dbname=bikesharing;charset=utf8";
    $conn = new PDO($dsn, "root", "");
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = "SELECT * FROM stazioni WHERE locazione LIKE ?;";
    $stmt = $conn->prepare($sql);
    $stmt->execute([ "%$ricerca%"]);
    $righe = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // In righe vi è un array di righe di database. Ogni riga è un array associativo con 
    // chiavi "nome colonna" e valori i valori nelle corrispondenti colonne.

    $xml = "<stazioni>";
    foreach($righe as $riga) {
        $xml .= "<stazione>
                <ID>$riga[ID]</ID>
                <locazione>$riga[locazione]</locazione>
                </stazione>";
    }   
    $xml .= "</stazioni>";
    echo $xml;
?>