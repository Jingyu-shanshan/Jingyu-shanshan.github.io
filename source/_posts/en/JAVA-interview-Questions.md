---
title: JAVA interview Questions
lang: en
date: 2024-05-25 00:53:45
categories:
    - JAVA
tags:
    - JAVA
    - JVM
    - Interview

abstract: JAVA interview Questions
preview: 100
---
# INTERVIEW QUESTIONS
I will post some possible JAVA interview questions here.

## JVM
### 1. Do we need to add `volatile` to Singleton instance when using Double-Checked Locking?
```java
public class Singleton {
    private static volatile Singleton instance;

    private Singleton() {}

    public static Singleton getInstance() {
        if (instance == null) {
            synchronized (Singleton.class) {
                if (instance == null) {
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }
}
```
Answer: Yes. When the program try to `new Singleton()`, it allocates the memory for the object and initializes the default value to properties of object. Without the volatile keyword, there's a possibility of instruction reordering. This could lead to another thread passing the first `if` check while instance is not null, even though the initialization of the instance hasn't been completed yet. Consequently, it might return a partially initialized object, causing errors.
In this implementation, the instance variable is declared as `volatile`, which prevents **instruction reordering**. In a multithreaded environment, when a thread initially calls the `getInstance()` method, it reaches the first `if` condition check. If instance is `null`, it enters the synchronized block to create the instance.

### 2. Cache line false sharing problem.
Cache line false sharing occurs in a multicore system when multiple threads modify variables that are located on the same cache line, causing performance degradation due to unnecessary cache coherence traffic.
    * **Cache Line Basics:** Modern CPUs have multiple levels of caches (L1, L2, L3) to speed up memory access. Data is loaded from main memory into the CPU caches in chunks called cache lines, typically 64 bytes in size.
    * **False Sharing Scenario:** False sharing happens when different threads on different cores modify variables that reside on the same cache line. Even if the variables are independent and the threads are not logically sharing data, they are physically sharing the same cache line.
    * **Performance Impact:** When one thread modifies a variable, the entire cache line is invalidated in other cores' caches. This forces the other cores to reload the cache line from memory, even if they are only interested in other variables within the same cache line. This invalidation and reloading cause significant performance overhead due to the increased cache coherence traffic.

The following code may occur False Sharing issues:
```java
public class FalseSharingExample {
    public static class SharedData {
        public volatile long var1;
        public volatile long var2;
    }
    public static SharedData data = new SharedData();

    public static void main(String[] args) {
        Thread t1 = new Thread(() -> {
            for (int i = 0; i < 1000000; i++) {
                data.var1++;
            }
        });

        Thread t2 = new Thread(() -> {
            for (int i = 0; i < 1000000; i++) {
                data.var2++;
            }
        });

        t1.start();
        t2.start();
    }
}
```
In this example, `var1` and `var2` are likely to reside on the same cache line. Modifying var1 in one thread will cause the cache line containing `var2` to be invalidated in the other thread's cache, leading to performance issues due to false sharing.

To mitigate false sharing, you can pad the variables so that they occupy different cache lines. This can be done using padding or special annotations depending on the language and platform:
```java
public class FalseSharingSolution {
    public static class SharedData {
        public volatile long var1;
        // Padding to ensure var1 and var2 are on different cache lines
        public volatile long p1, p2, p3, p4, p5, p6, p7;
        public volatile long var2;
    }
    public static SharedData data = new SharedData();

    public static void main(String[] args) {
        Thread t1 = new Thread(() -> {
            for (int i = 0; i < 1000000; i++) {
                data.var1++;
            }
        });

        Thread t2 = new Thread(() -> {
            for (int i = 0; i < 1000000; i++) {
                data.var2++;
            }
        });

        t1.start();
        t2.start();
    }
}
```
By adding padding fields between `var1` and `var2`, you ensure they are placed in separate cache lines, thereby avoiding false sharing and improving performance.