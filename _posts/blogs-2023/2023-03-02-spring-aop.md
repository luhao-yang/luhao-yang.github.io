---
layout: post
title: "Spring AOP - All you need to know"
featured-img: spring-logo
categories:
  - Backend
tags:
  - java
  - spring
  - aop
---

Wanted to review my knowledge of AOP in spring framework. Here is what I wrapped up from office Spring document.

# AOP(Aspect Oriented Programming)

Aspect-oriented Programming (AOP) complements Object-oriented Programming (OOP) by providing another way of thinking about program structure.

Spring provides simple and powerful ways of writing custom aspects by using either a schema-based approach or the @AspectJ annotation style.

AOP is used in the Spring Framework to:

Provide declarative enterprise services. The most important such service is declarative transaction management.

Let users implement custom aspects, complementing their use of OOP with AOP.

# AOP Concepts

- `Aspect`: A modularization of a concern that cuts across multiple classes. Transaction management is a good example of a crosscutting concern in enterprise Java applications.
- `Join` point: A point during the execution of a program, such as the execution of a method or the handling of an exception. In Spring AOP, a join point always represents a method execution.
- `Advice`: Action taken by an aspect at a particular join point. Different types of advice include “around”, “before” and “after” advice.
- `Pointcut`: A predicate that matches join points. Advice is associated with a pointcut expression and runs at any join point matched by the pointcut.
- `Introduction`: Declaring additional methods or fields on behalf of a type. Spring AOP lets you introduce new interfaces (and a corresponding implementation) to any advised object. For example, you could use an introduction to make a bean implement an IsModified interface, to simplify caching.(Honestly, I don't really understand this)

![](https://www.javainuse.com/boot-27_1.jpg)

### AOP proxy

In the Spring Framework, an AOP proxy is a JDK dynamic proxy or a CGLIB proxy.

Spring AOP defaults to using standard JDK dynamic proxies for AOP proxies. This enables any interface (or set of interfaces) to be proxied.

Spring AOP can also use `CGLIB` proxies. This is necessary to proxy classes rather than interfaces. By default, CGLIB is used if a business object does not implement an interface.

Cglib (Code Generation Library) library.

> It is a byte instrumentation library used in many Java frameworks such as Hibernate or Spring. The bytecode instrumentation allows manipulating or creating classes after the compilation phase of a program.

Classes in Java are loaded dynamically at runtime. Cglib is using this feature of Java language to make it possible to add new classes to an already running Java program.

Hibernate uses `cglib` for generation of dynamic proxies. For example, it will not return full object stored in a database but it will return an instrumented version of stored class that lazily loads values from the database on demand.

Popular mocking frameworks, like `Mockito`, use `cglib` for mocking methods. The mock is an instrumented class where methods are replaced by empty implementations.

**JDK Dynamic proxy can only proxy by interface** (so your target class needs to implement an interface, which is then also implemented by the proxy class).

CGLIB (and javassist) can create a proxy by **subclassing**. In this scenario the proxy becomes a subclass of the target class. No need for interfaces.

# Enabling `@AspectJ` Support

`@AspectJ` refers to a style of declaring aspects as regular Java classes annotated with annotations.

### Enabling @AspectJ Support with Java Configuration

```java
@Configuration
@EnableAspectJAutoProxy
class AppConfig
```

### Define Pointcut

```java
package com.xyz;

@Aspect
public class Pointcuts {

    @Pointcut("execution(public * *(..))")
    public void publicMethod() {}

    @Pointcut("within(com.xyz.trading..*)")
    public void inTrading() {}

    @Pointcut("publicMethod() && inTrading()")
    public void tradingOperation() {}
}
```

More example: https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#aop-pointcuts-examples

### Declaring Advice

```java
@Aspect
public class BeforeExample {

    @Before("execution(* com.xyz.dao.*.*(..))")
    public void doAccessCheck() {
        // ...
    }
}

@Aspect
public class AfterReturningExample {

    @AfterReturning(
        pointcut="execution(* com.xyz.dao.*.*(..))",
        returning="retVal")
    public void doAccessCheck(Object retVal) {
        // ...
    }
}

@Aspect
public class AfterThrowingExample {

    @AfterThrowing("execution(* com.xyz.dao.*.*(..))")
    public void doRecoveryActions() {
        // ...
    }
}

@Aspect
public class AroundExample {

    @Around("execution(* com.xyz..service.*.*(..))")
    public Object doBasicProfiling(ProceedingJoinPoint pjp) throws Throwable {
        // start stopwatch
        Object retVal = pjp.proceed();
        // stop stopwatch
        return retVal;
    }
}

```

### Advice Parameters

Spring offers fully typed advice, meaning that you declare the parameters you need in the advice signature (as we saw earlier for the returning and throwing examples) rather than work with Object[] arrays all the time.

Any advice method may declare, as its first parameter, a parameter of type org.aspectj.lang.JoinPoint. Note that around advice is required to declare a first parameter of type ProceedingJoinPoint, which is a subclass of JoinPoint。

The `JoinPoint` interface provides a number of useful methods:

`getArgs()`: Returns the method arguments.

`getThis()`: Returns the proxy object.

`getTarget()`: Returns the target object.

`getSignature()`: Returns a description of the method that is being advised.

`toString()`: Prints a useful description of the method being advised.

We have already seen how to bind the returned value or exception value (using after returning and after throwing advice). To make argument values available to the advice body, you can use the binding form of `args`.

```java
@Before("execution(* com.xyz.dao.*.*(..)) && args(account,..)")
public void validateAccount(Account account) {
    // ...
}
```

The `args(account,..)` part of the pointcut expression serves two purposes. First, it restricts matching to only those method executions where the method takes at least one parameter, and the argument passed to that parameter is an instance of `Account`. Second, it makes the actual `Account` object available to the advice through the `account` parameter.

The proxy object (`this`), target object (`target`), and annotations (`@within`, `@target`, `@annotation`, and `@args`) can all be bound in a similar fashion. The next set of examples shows how to match the execution of methods annotated with an @Auditable annotation and extract the audit code:

```java
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface Auditable {
    AuditCode value();
}


@Before("com.xyz.Pointcuts.publicMethod() && @annotation(auditable)")
public void audit(Auditable auditable) {
    AuditCode code = auditable.value();
    // ...
}
```

### Advice Ordering

Spring AOP follows the same precedence rules as AspectJ to determine the order of advice execution. The highest precedence advice runs first "on the way in" (so, given two pieces of before advice, the one with highest precedence runs first). "On the way out" from a join point, the highest precedence advice runs last (so, given two pieces of after advice, the one with the highest precedence will run second).

When two pieces of advice defined in different aspects both need to run at the same join point, unless you specify otherwise, the order of execution is undefined. You can control the order of execution by specifying precedence. This is done in the normal Spring way by either implementing the `org.springframework.core.Ordered` interface in the aspect class or annotating it with the` @Order` annotation.

# Proxying Mechanisms

Spring AOP uses either JDK dynamic proxies or `CGLIB` to create the proxy for a given target object. JDK dynamic proxies are built into the JDK, whereas `CGLIB` is a common open-source class definition library (repackaged into spring-core)

If the target object to be proxied implements at least one interface, a JDK dynamic proxy is used. All of the interfaces implemented by the target type are proxied. If the target object does not implement any interfaces, a CGLIB proxy is created.

If you want to force the use of CGLIB proxying (for example, to proxy every method defined for the target object, not only those implemented by its interfaces), you can do so. However, you should consider the following issues:

With CGLIB, final methods cannot be advised, as they cannot be overridden in runtime-generated subclasses.

As of Spring 4.0, the constructor of your proxied object is NOT called twice anymore, since the CGLIB proxy instance is created through Objenesis. Only if your JVM does not allow for constructor bypassing, you might see double invocations and corresponding debug log entries from Spring’s AOP support.

Due to the proxy-based nature of Spring’s AOP framework, calls within the `target` object are, by definition, not intercepted. For JDK proxies, only public interface method calls on the proxy can be intercepted. With CGLIB, public and protected method calls on the proxy are intercepted (and even package-visible methods, if necessary). However, common interactions through proxies should always be designed through public signatures.

Note that pointcut definitions are generally matched against any intercepted method. If a pointcut is strictly meant to be public-only, even in a CGLIB proxy scenario with potential non-public interactions through proxies, it needs to be defined accordingly.

If your interception needs include method calls or even constructors within the target class, consider the use of Spring-driven native AspectJ weaving instead of Spring’s proxy-based AOP framework. This constitutes a different mode of AOP usage with different characteristics, so be sure to make yourself familiar with weaving before making a decision.

linking aspects with other application types or objects to create an advised object. This can be done at compile time (using the AspectJ compiler, for example), load time, or at runtime. Spring AOP, like other pure Java AOP frameworks, performs weaving at **runtime**.

# Lower-level Spring AOP APIs

For advanced usage, please refer to https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#aop-api

# Final Review of An AOP Example

```java
package com.xyz;

import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;

@Aspect
public class CommonPointcuts {

    /**
     * A join point is in the web layer if the method is defined
     * in a type in the com.xyz.web package or any sub-package
     * under that.
     */
    @Pointcut("within(com.xyz.web..*)")
    public void inWebLayer() {}

    /**
     * A join point is in the service layer if the method is defined
     * in a type in the com.xyz.service package or any sub-package
     * under that.
     */
    @Pointcut("within(com.xyz.service..*)")
    public void inServiceLayer() {}

    /**
     * A join point is in the data access layer if the method is defined
     * in a type in the com.xyz.dao package or any sub-package
     * under that.
     */
    @Pointcut("within(com.xyz.dao..*)")
    public void inDataAccessLayer() {}

    /**
     * A business service is the execution of any method defined on a service
     * interface. This definition assumes that interfaces are placed in the
     * "service" package, and that implementation types are in sub-packages.
     *
     * If you group service interfaces by functional area (for example,
     * in packages com.xyz.abc.service and com.xyz.def.service) then
     * the pointcut expression "execution(* com.xyz..service.*.*(..))"
     * could be used instead.
     *
     * Alternatively, you can write the expression using the 'bean'
     * PCD, like so "bean(*Service)". (This assumes that you have
     * named your Spring service beans in a consistent fashion.)
     */
    @Pointcut("execution(* com.xyz..service.*.*(..))")
    public void businessService() {}

    /**
     * A data access operation is the execution of any method defined on a
     * DAO interface. This definition assumes that interfaces are placed in the
     * "dao" package, and that implementation types are in sub-packages.
     */
    @Pointcut("execution(* com.xyz.dao.*.*(..))")
    public void dataAccessOperation() {}

}
```

```java
@Aspect
public class ConcurrentOperationExecutor implements Ordered {

    private static final int DEFAULT_MAX_RETRIES = 2;

    private int maxRetries = DEFAULT_MAX_RETRIES;
    private int order = 1;

    public void setMaxRetries(int maxRetries) {
        this.maxRetries = maxRetries;
    }

    public int getOrder() {
        return this.order;
    }

    public void setOrder(int order) {
        this.order = order;
    }

    @Around("com.xyz.CommonPointcuts.businessService()")
    public Object doConcurrentOperation(ProceedingJoinPoint pjp) throws Throwable {
        int numAttempts = 0;
        PessimisticLockingFailureException lockFailureException;
        do {
            numAttempts++;
            try {
                return pjp.proceed();
            }
            catch(PessimisticLockingFailureException ex) {
                lockFailureException = ex;
            }
        } while(numAttempts <= this.maxRetries);
        throw lockFailureException;
    }
}

```
