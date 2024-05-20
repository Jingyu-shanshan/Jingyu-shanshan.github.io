---
title: JVM Introduction
lang: en
date: 2024-05-19 17:25:38
categories:
    - JAVA
tags:
    - JAVA
    - JVM

abstract: JVM INTRODUCTION
preview: 50
---
# Java Virtual Machine (JVM) Architecture
This blog introduces the basic srtucture and workload of JVM.

## Java Architecture
Let’s look at Java architecture to get a high-level picture of JVM.

![Java Architecture](Java-architecture.png)

# Internal Structure of JVM
![JVM Architecture](JVM-architecture.png)

There are three main mechanisms inside the JVM as shown in the above diagram.
* ClassLoader
* Memory Area
* Execution Engine

## ClassLoader
The Class Loader Subsystem is a foundational part of the JVM, enabling the dynamic loading, linking, and initialization of classes. By following a hierarchical delegation model, it ensures the integrity and consistency of the class loading process, while also providing flexibility through custom class loaders.

### How the Class Loader Subsystem Works
* **Loading**:
    * The Class Loader Subsystem loads class files into the JVM from various sources, such as local file systems, remote servers, or network locations.
    * This process involves locating the class file, reading its binary data, and then transforming it into a class object in memory.
* **Linking**:
    * Verification: Ensures the correctness of the bytecode, making sure it adheres to the JVM's constraints and security standards.
    * Preparation: Allocates memory for class variables (static fields) and initializes them with default values.
    * Resolution: Converts symbolic references in the class file into actual references to memory locations.
* **Initialization**:
    * Executes the class's static initializers and the static blocks of code.
    * This phase involves executing any class initialization code to set up static fields and other static structures.

## Runtime Data Area
Runtime data areas are essential components that support the execution of Java programs. The JVM runtime data areas include several key components:
* **Program Counter (PC) Register:** Each JVM thread has its own PC register. At any point, each Java virtual machine thread is executing the code of a single method, the current method for that thread.
* **Java Virtual Machine Stacks:** Each Java virtual machine thread has a private Java virtual machine stack, created at the same time as the thread.
    - Each method creates a stack frame when it executes, which stores the local variable table, operand stack, dynamic linking, method return address, and other information.
    - The process of calling a method and completing its execution corresponds to pushing and popping a stack frame in the JVM stack.
* **Native Method Stacks:**
    - These stacks are similar to JVM stacks but are used for native methods. 
    - The HotSpot JVM does not distinguish between the JVM stack and the native method stack, treating them as a single stack​
* **Method Area:** This area stores class structures such as the runtime constant pool, field and method data, and the code for methods and constructors. In the HotSpot JVM, this area is often referred to as the "Permanent Generation" (PermGen), though in JDK 8 and later, it has been replaced by the "Metaspace"
* **Heap:** The heap is shared among all JVM threads and is the runtime data area from which memory for all class instances and arrays is allocated. The heap is created at JVM startup and is managed by the garbage collector, which reclaims memory used by objects that are no longer reachable​.
    - From a memory reclamation perspective, it is divided into the young generation and old generation, which are further subdivided into Eden space, From Survivor space, and To Survivor space.
    - From a memory allocation perspective, it may include multiple thread-local allocation buffers (TLABs) for private allocation by threads.


# References
[1] [Understanding Java Virtual Machine (JVM) Architecture](https://medium.com/java-for-beginners/understanding-java-virtual-machine-jvm-architecture-e68d1c611026)
[2] [The Structure of the Java Virtual Machine](https://docs.oracle.com/javase/specs/jvms/se6/html/Overview.doc.html)