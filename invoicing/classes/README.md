# Classes
<!-- TOC -->

- [Definition](#definition)
- [Configuring Classes](#configuring-classes)
<!-- /TOC -->

## Definition

Classes are the fundamental building blocks of the data model and consequently of the configuration of your database and its interaction with the API. 

Classes determine the quantity, type and range of data outputs to share in the API from the data model and are a key mechanism by which the API is configured.

Classes can be of any type: four are shown here as [examples](https://github.com/loopsoftware/sample-invoicing/tree/master/invoicing/classes) (Third Party, Invoice, Line and Type). All are fully customisable, as with all elements of the Yupana Framework.

Defining your required classes is an essential first stage of configuring the data model and determining which data to select for exposure via the API. 

This chapter shows in simple steps how to configure your Classes for data as required.

Classes have a set of built-in objects that represent which type of data a slot can store. 
For list and description see [Data Types](https://github.com/YupanaInc/Yupana-Framework/blob/build/2.3.0/documentation/datatypes.md).

Classes have a set of pre-set properties. For list and description see [Class Properties](https://github.com/YupanaInc/documentation/blob/master/Yupana-Framework/2.3.0/properties.md#class-properties).

## Configuring Classes

Each Class is a unique XML file 

```sh
<yo:object xmlns:yo="http://framework.yuapan.com/ood" module="invoicing" lang="en" >
	<class name="thirdParty" userName="Third Party" id="c5f3240f-159e-4b32-ba25-d5b7b9b2526f" shortDescription="reference" longDescription="reference name">
        <slot name="reference" type="YTstring" userName="Reference" mandatory="true"/>
		<slot name="name" type="YTstring" userName="Name" mandatory="true"/>
	</class>
</yo:object>
```


## Invoice Class

XX
## Line Class

XX
## Product Class

XX
---
**Note**

Write some notes here

---






For more information see  [this document (not yet written)](https://arpegews.atlassian.net/browse/FY-804).

  