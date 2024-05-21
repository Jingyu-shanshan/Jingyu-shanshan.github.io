---
title: Parent Delegation Model
lang: en
date: 2024-05-20 21:30:06
categories:
    - JAVA
tags:
    - JAVA
    - JVM

abstract: Parent Delegation Model
preview: 100
---
# Parent Delegation Model In JVM
The Parent Delegation Model in Java class loading refers to the hierarchical approach used by class loaders to load classes. This model ensures that class loaders delegate the task of class loading to their parent class loaders before attempting to load the class themselves.

![Parent Delegation Model Work Flow](parent-delegation-model.png)

## Hierarchy of Class Loaders:

* Java uses a hierarchical delegation model where every class loader has a parent class loader. The delegation starts from the top of the hierarchy with the bootstrap class loader, which is responsible for loading core Java classes (`java.*`).
* Custom class loaders typically extend `java.lang.ClassLoader` and have a parent class loader, forming a chain up to the bootstrap class loader.

## Delegation Mechanism:

* When a class loader is asked to load a class, it first delegates this request to its parent class loader before attempting to load the class itself. This ensures that core Java classes and those provided by the application are loaded by the appropriate class loaders and prevents duplicate class definitions.
* For example, if a custom class loader attempts to load a class named `java.util.ArrayList`, it will first delegate this request to its parent. Since `ArrayList` is part of the core Java libraries, it will be loaded by the bootstrap class loader.

## Advantages:

* **Security**: Prevents malicious classes from overriding core Java classes by ensuring they are always loaded by the bootstrap class loader.
* **Consistency**: Ensures that the same version of a class is used throughout the application, avoiding conflicts and inconsistencies.

# Conclusion
The parent delegation model ensures that the system class loader (or any custom class loader) delegates the loading of a class to its parent before attempting to load it itself. This hierarchical delegation helps in maintaining a clear separation of responsibilities and ensures that core Java classes are loaded by the trusted system class loader (or its parent)​.

# References
[1] [Understanding Network Class Loaders](https://www.oracle.com/technical-resources/articles/javase/classloaders.html)