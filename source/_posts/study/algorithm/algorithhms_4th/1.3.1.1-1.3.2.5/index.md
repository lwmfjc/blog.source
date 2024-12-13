---
title: "算法红皮书 1.3.1.1-1.3.2.5"
date: 2022-03-22 13:51:26 
draft: false
updated: 2022-03-23 13:51:26 
description: 数据类型的值就是一组对象的集合，所有
categories:
 - "学习"
tags:
 - "算法红皮书(第四版)"

---

##  背包、队列和栈  
* 数据类型的值就是一组对象的集合，所有操作都是关于添加、删除或是访问集合中的对象  
* 本章将学习三种数据类型：背包Bag、队列Queue、栈Stack  
  * 对集合中的对象的表示方式直接影响各种操作的效率  
  * 介绍泛型和迭代  
  * 介绍并说明链式数据结构的重要性(链表)
  
###  API 
* 泛型可迭代的基础集合数据类型的API
  * 背包  
  ![ly-20241212142051025](img/ly-20241212142051025.png)
  * 队列(先进先出FIFO)  
  ![ly-20241212142051259](img/ly-20241212142051259.png)
  * 下压(后进先出,LIFO)栈
  ![ly-20241212142051367](img/ly-20241212142051367.png)
* 泛型  
  * 泛型，参数化类型  
  * 在每份API 中，类名后的```<Item> ```记号将Item 定义为一个类型参数，它是一个象征性的占位符，表示的是用例将会使用的某种具体数据类型  
* 自动装箱  
  * 用来处理原始类型  
  * Boolean、Byte、Character、Double、Float、Integer、Long 和Short 分别对应着boolean、byte、char、double、float、int、long 和short  
  * 自动将一个原始数据类型转换为一个封装类型称为自动装箱，自动将一个封装类型转换为一个原始数据类型被称为自动拆箱  
* 可迭代的集合类型  
  * 迭代访问集合中的所有元素  
* 背包是一种不支持从中删除元素的集合数据类型--帮助用例收集元素并迭代遍历所有收集到的元素（**无序遍历**）  
  * 典型用例，计算标准差  
  ![](./1.3.1.1-1.3.2.5/1648014765406.png)
* 先进先出队列  
  * 是一种基于先进先出(FIFO)策略的集合类型  
  * 使用队列的主要原因：集合保存元素的同时保存它们的相对顺序  
  * 如图  
    ![ly-20241212142051478](img/ly-20241212142051478.png)
  * Queue用例(先进先出)    
    ![ly-20241212142051591](img/ly-20241212142051591.png)

* 下压栈  
  * 简称栈，是一种基于后进先出LIFO策略的集合类型  
  * 比如，收邮件等，如图  
    ![ly-20241212142051703](img/ly-20241212142051703.png)
  * Stack的用例  
    ![ly-20241212142051815](img/ly-20241212142051815.png)
* 用栈解决算数表达式的问题  
  （双栈算数表达式求值算法）  
  ![ly-20241212142051919](img/ly-20241212142051919.png)  

### 集合类数据类型的实现  

- 定容栈，表示容量固定的字符串栈的抽象数据类型  

  - 只能处理String值，支持push和pop

  - 抽象数据类型  
    ![ly-20241212142052029](img/ly-20241212142052029.png)

  - 测试用例  

    ![ly-20241212142052135](img/ly-20241212142052135.png)

  - 使用方法  
    ![ly-20241212142052243](img/ly-20241212142052243.png)

  - 数据类型的实现  
    ![ly-20241212142052353](img/ly-20241212142052353.png)

    

- 泛型  

  - ```public class FixedCapacityStack<Item>```
  - 由于不允许直接创建泛型数组，所以 ~~a =new Item[cap]~~ 不允许，应该改为  
    a=(Item[])new Object[cap];  
  - 泛型定容栈的抽象数据类型  
    ![ly-20241212142052474](img/ly-20241212142052474.png)
  - 测试用例  
    ![ly-20241212142052593](img/ly-20241212142052593.png)
  - 使用方法  
    ![ly-20241212142052746](img/ly-20241212142052746.png)
  - 数据类型的实现  
    ![ly-20241212142052865](img/ly-20241212142052865.png)

- 调整数组大小  

  - N为当前元素的数量  
    使用resize创建新的数组  
    ![ly-20241212142052972](img/ly-20241212142052972.png)
  - 当元素满了的时候进行扩容  
    ![ly-20241212142053080](img/ly-20241212142053080.png)
  - 当元素过少(1/4)的时候，进行减半  
    ![ly-20241212142053185](img/ly-20241212142053185.png)

- 对象游离

  - Java的垃圾回收策略是回收所有无法被访问的对象的内存

  - 示例中，被弹出的元素不再需要，但由于数组中的引用仍然让它可以继续存在（垃圾回收器无法回收），这种情况（保存了一个不需要的对象的引用）称为游离，避免游离的做法就是将数组元素设为null  

    

- 迭代

  - foreach和while  
    ![ly-20241212142053293](img/ly-20241212142053293.png)

    - 集合数据类型必须实现iterator()并返回Iterator对象
    - Iterator类必须包括两个方法,hasNext()和next()

  - 让类继承```Iterable<Item>```使类可迭代
    ![ly-20241212142053404](img/ly-20241212142053404.png)

  - 使用一个嵌套类  
    ![ly-20241212142053511](img/ly-20241212142053511.png)

  - 下压栈的代码  

    ```java
    import java.util.Iterator;
    public class ResizingArrayStack<Item> implements Iterable<Item>
    {
    	private		Item[] a = (Item[]) new Object[1];      /* 栈元素 */
    	private int	N = 0;                                  /* 元素数量 */
    	public boolean isEmpty()
    	{
    		return(N == 0);
    	}
    
    
    	public int size()
    	{
    		return(N);
    	}
    
    
    	private void resize( int max )
    	{       /* 将栈移动到一个大小为max 的新数组 */
    		Item[] temp = (Item[]) new Object[max];
    		for ( int i = 0; i < N; i++ )
    			temp[i] = a[i];
    		a = temp;
    	}
    
    
    	public void push( Item item )
    	{       /* 将元素添加到栈顶 */
    		if ( N == a.length )
    			resize( 2 * a.length );
    		a[N++] = item;
    	}
    
    
    	public Item pop()
    	{                       /* 从栈顶删除元素 */
    		Item item = a[--N];
    		a[N] = null;    /* 避免对象游离（请见1.3.2.4 节） */
    		if ( N > 0 && N == a.length / 4 )
    			resize( a.length / 2 );
    		return(item);
    	}
    
    
    	public Iterator<Item> iterator()
    	{
    		return(new ReverseArrayIterator() );
    	}
    
    
    	private class ReverseArrayIterator implements Iterator<Item>
    	{       /* 支持后进先出的迭代 */
    		private int i = N;
    		public boolean hasNext()
    		{
    			return(i > 0);
    		}
    
    
    		public Item next()
    		{
    			return(a[--i]);
    		}
    
    
    		public void remove()
    		{
    		}
    	}
    }
    ```

    


### End  
