---
id: 280
title: Machine Learning
#date: 2018-07-03T13:41:08+00:00
author: Luhao
summary: Just some basic concepts of Machine Learning
layout: post
#guid: http://flywithfan.net/?p=280
#permalink: /machine-learning/280/
categories:
  - Misc
tags:
  - machine learning
---

## What is ML

Machine learning is a subset of artificial intelligence in the field of computer science. Here I have some explanations about ML.

> Machine learning is a method of data analysis that automates analytical model building. It is a branch of artificial intelligence based on the idea that systems can learn from data, identify patterns and make decisions with minimal human intervention.

And

> Machine learning is a data analytics technique that teaches computers to do what comes naturally to humans and animals: learn from experience. Machine learning algorithms use computational methods to “learn” information directly from data without relying on a predetermined equation as a model. The algorithms adaptively improve their performance as the number of samples available for learning increases.

## Importance

With the rise in big data, machine learning has become a key technique for solving problems in areas, such as:

- Automotive, aerospace, and manufacturing
- Computational biology, for tumor detection, drug discovery, and DNA sequencing
- Image processing and computer vision, for face recognition, motion detection, and object detection
- Natural language processing, for voice recognition applications
- Computational finance, for credit scoring and algorithmic trading
- Energy production, for price and load forecasting

Machine learning algorithms find natural patterns in data that generate insight and help you make better decisions and predictions. They are used every day to make critical decisions in medical diagnosis, stock trading, energy load forecasting, and more. For example, media sites rely on machine learning to sift through millions of options to give you song or movie recommendations. Retailers use it to gain insight into their customers’ purchasing behavior.

## Who&#8217;s using it?

Most industries working with large amounts of data have recognized the value of machine learning technology. By gleaning insights from this data – often in real time – organizations are able to work more efficiently or gain an advantage over competitors.

- **Financial services**: to identify important insights in data, and prevent fraud
- **Government**: detect fraud and minimize identity theft
- **Health care**: improved diagnoses and treatment
- **Marketing and sales**: recommend items, personalize a shopping experience
- **Oil and gas**: finding new energy sources, analyzing minerals in the ground, predicting refinery sensor failure.
- **Transportation**: identify patterns and trends, making routes more efficient and predicting potential problems

## How it works

Two of the most widely adopted machine learning methods are supervised learning and unsupervised learning – but there are also other methods of machine learning. Here&#8217;s an overview of the most popular types.

### Supervised learning

A supervised learning algorithm takes a known set of input data and known responses to the data (output) and trains a model to generate reasonable predictions for the response to new data. Use supervised learning if you have known data for the output you are trying to predict.

Supervised learning uses classification and regression techniques to develop predictive models.

**Classification** techniques predict discrete responses—for example, whether an email is genuine or spam, or whether a tumor is cancerous or benign. Classification models classify input data into categories. Typical applications include medical imaging, speech recognition, and credit scoring.Use classification if your data can be tagged, categorized, or separated into specific groups or classes.

Common algorithms for performing classification include support vector machine (SVM), boosted and bagged decision trees, k-nearest neighbor, Naïve Bayes, discriminant analysis, logistic regression, and neural networks.

**Regression** techniques predict continuous responses—for example, changes in temperature or fluctuations in power demand. Typical applications include electricity load forecasting and algorithmic trading.

Use regression techniques if you are working with a data range or if the nature of your response is a real number, such as temperature or the time until failure for a piece of equipment.

Common regression algorithms include linear model, nonlinear model, regularization, stepwise regression, boosted and bagged decision trees, neural networks, and adaptive neuro-fuzzy learning.

### Unsupervised Learning

Unsupervised learning finds hidden patterns or intrinsic structures in data. It is used to draw inferences from datasets consisting of input data without labeled responses.

Clustering is the most common unsupervised learning technique. It is used for exploratory data analysis to find hidden patterns or groupings in data. Applications for cluster analysis include gene sequence analysis, market research, and object recognition.

![](https://www.mathworks.com/content/mathworks/www/en/discovery/machine-learning/jcr:content/mainParsys3/discoverysubsection_1965078453/mainParsys3/image_2109075398_cop.adapt.full.high.svg/1523365089335.svg)

### Data Mining, Machine Learning and Deep Learning

**Data mining** can be considered a superset of many different methods to extract insights from data. It might involve traditional statistical methods and machine learning. Data mining applies methods from many different areas to identify previously unknown patterns from data. This can include statistical algorithms, machine learning, text analytics, time series analysis and other areas of analytics. Data mining also includes the study and practice of data storage and data manipulation.

**Machine Learning** is that just like statistical models, the goal is to understand the structure of the data – fit theoretical distributions to the data that are well understood. So, with statistical models there is a theory behind the model that is mathematically proven, but this requires that data meets certain strong assumptions too. Machine learning has developed based on the ability to use computers to probe the data for structure, even if we do not have a theory of what that structure looks like. The test for a machine learning model is a validation error on new data, not a theoretical test that proves a null hypothesis. Because machine learning often uses an iterative approach to learn from data, the learning can be easily automated. Passes are run through the data until a robust pattern is found.

**Deep learning** combines advances in computing power and special types of neural networks to learn complicated patterns in large amounts of data. Deep learning techniques are currently state of the art for identifying objects in images and words in sounds. Researchers are now looking to apply these successes in pattern recognition to more complex tasks such as automatic language translation, medical diagnoses and numerous other important social and business problems.

---

1. [What is ML?](https://www.mathworks.com/discovery/machine-learning.html)
2. [ML-What it is and why it matters](https://www.sas.com/en_us/insights/analytics/machine-learning.html)
