# Classes
<!-- TOC -->

- [Definition](#definition)
- [Creating and Configuring Classes](#creating-and-configuring-classes)
    - [Slots](#slots)    
- [Running Classes](#running-classes)
    - [Methods](#methods)    
    <!-- /TOC -->

## Definition

Classes are the fundamental building blocks of the data model and determine the quantity, type and range of data outputs. They must be assigned to a specific [Module]((https://github.com/YupanaInc/Yupana-Framework/blob/build/2.3.0/documentation/package-module.md)).

Classes can be of any type: all are fully customisable, like all other elements of the Yupana Framework ([Some example Classes](https://github.com/loopsoftware/sample-invoicing/tree/master/invoicing/classes)) .

Defining classes is the first stage of configuring the data model and determining which data to select for exposure, or to run hidden from front-end application use. 

Classes are the mechanism for configuring the API at Framework level to work with your external database and Loop.

## Creating and Configuring Classes

Classes are .XML files and must be saved in the <code>/classes/</code> folder within a specific Module. 

Example:
```
sample-invoicing / invoicing / classes
```

Metadata describing the Class properties:


| __Tag__                         | __Function__             | __Example__  | __Mandatory__     |
|---------------------------------|--------------------------|--------------|--------------     |
| <code>yo:object xmlns:yo</code> |calls the Framework namespace|http://framework.yuapan.com/ood| Yes  
| <code>module</code>             | calls the requisite [Module]( https://github.com/YupanaInc/documentation/blob/master/Yupana-Framework/2.3.0/package-module.md)  | <code>module="invoicing"</code>                                                                   |Yes|
| <code>class name</code>         | identifies it to the API |<code>class name="thirdParty"</code>|Yes|
| <code>shortDescription</code>   | used to        |<code>shortDescription="reference"</code>     |Yes|
| <code>LongDescription</code>    | used to        |<code>longDescription="reference & date"</code> |Yes|
| <code>userName</code>           |identifies it to the user |<code>userName="Third Party"</code> |No|
| <code>lang</code> |specifies language for automatic translation|<code>lang="fr"</code>          |No|
| <code>scope</code>              | whether private or public |<code>scope="private"</code>|No|
| | |  ||


Example:

```xml
<yo:object xmlns:yo="http://framework.yuapan.com/ood" module="invoicing" lang="en" >

<class name="thirdParty" userName="Third Party" id="c5f3240f-159e-4b32-ba25-d5b7b9b2526f" shortDescription="reference" longDescription="reference name">

<slot name="reference" type="YTstring" userName="Reference" mandatory="true"/>
<slot name="name" type="YTstring" userName="Name" mandatory="true"/>
	</class>
</yo:object>
```
Classes contain <code>slots</code> (fields described by a data type and assigned properties) representing the types of data and rules for its handling that are permitted in a specific system configuration. 

[List and description of Yupana datatypes](https://github.com/YupanaInc/Yupana-Framework/blob/build/2.3.0/documentation/datatypes.md).

[List and description of Class Properties](https://github.com/YupanaInc/documentation/blob/master/Yupana-Framework/2.3.0/properties.md#class-properties). **< -  Requires completion**

Within a Class, any number of user-defined <code>slots</code> may be created.

### Slots

#### Mandatory Slot properties

  <code>Slots</code> require a name and data type to function. 

```xml
<slot name="product" userName="Product" type="YTref"
```


|  | | |
|------------ |--------------|--------------|
| <code>slot name</code> | for API                     | <code>slot name="reference" </code>|
| <code>type</code> | See [Data Types](https://github.com/YupanaInc/Yupana-Framework/blob/build/2.3.0/documentation/datatypes.md)                                                     | <code>type="YTstring"</code>|
|  | | |

#### Optional Slot properties

  Most properties are optional


|  | | |
|------------ |--------------|--------------|
| <code>userName</code> | friendly form of slot name        | <code>userName="Reference"</code>  |
|<code>mandatory</code> |whether slot value must be returned| <code>mandatory="true"</code>|

|<code>lang</code>      |specifies language                 | <code>lang="fr"</code>|
|  | | |




  A <code> slot</code> may be used to invoke another class within the same module

```xml
<slot name="product" class="product"/>
```
or from a different module

```xml
<slot name="product" class="invoicing.product"/>
```

Further information on [Slot properties](https://github.com/YupanaInc/Yupana-Framework/blob/build/2.3.0/documentation/properties.md#slot-properties).

## Running Classes

Each Class is defined by a unique XML file instantiated at runtime to create business objects (except where defined as <code>scope="private"</code>). 

The Framework API allows these objects to be read from and written to the database.

### Methods
For information on Methods for instantiating Classes, see Methods in the [Properties](https://github.com/YupanaInc/Yupana-Framework/blob/build/2.3.0/documentation/properties.md) reference.   **< -  Requires writing**


 