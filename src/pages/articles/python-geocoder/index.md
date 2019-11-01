---
title: 'Python Geocoder: A Guide to Managing Locations in Your Apps'
date: '2019-07-13T23:46:37.121Z'
layout: post
draft: false
path: '/posts/python-geocoder/'
category: 'Python'
tags:
  - 'Python'
  - 'Geocoding'
  - 'Locations'
  - 'Crosspost'
description: 'A brief exploration of how to use location data in applications.'
---

### The original version of this post appeared at https://stackify.com/python-geocoder-a-guide-to-managing-locations-in-your-apps/

A great thing about building applications for the internet is that people from all around the world can benefit from your effort. You can gather new users from Taiwan to Colorado and meet their needs just as effectively. In this global context, it can be good to provide your users with local flavor to help them feel connected to you and your applications. It can also be useful for you to know where your users are coming from to make sure that your infrastructure is configured in the best way.

In this post, I show you how to get started with Python geocoder using free services and the requests module to gather and leverage data.

## What Is Geolocation?

Geolocation is the process of identifying the geographical location of a person or device by means of digital information. You use some data you have to gather more data for the benefit of your users. This can be important when dealing with information for users from the EU, for example—it can help you comply with laws around data protection. Identifying where your users are can also help to provide a more bespoke and effective service.

A quick note: this is a Python guide, so I'm going to make a few assumptions. I'll assume that you're using Python 3, you have it installed, and you know the basic syntax. Nothing we'll cover here is very complicated, but hopefully it'll be quite interesting. If you're having trouble getting started, have a look at the Python site.

## Where Are They?

One of the key pieces of information you can use to find out where your users are is their IP address. It's possible for users to use a proxy service to seem to be from somewhere else. Having said that, for most users this is a helpful approach.

I've looked into a number of applications that provide this service and have decided to use ipstack for this tutorial. If you sign up for their free account, you get 10,000 calls per month, which is more than enough to get started.

I think the API for this service is quite straightforward. Once you've signed up, you'll be taken to a dashboard and get an API key. This key is used to identify your application to the service, allowing you to make the calls. Keep this information safe and private, because anyone can use it and pretend to be you. That might not be a huge deal for this free service, but it's a good habit to get into.

Let's see how good the service is at finding you. Get your IP address (get it in plain text by going here), open a new tab in your browser, and paste the link below. Of course, make sure you swap out the relevant details.

`http://api.ipstack.com/YOUR-IP-HERE?access_key=YOUR-API-KEY-HERE`

If everything has gone correctly, you should get a response that shows the location of your IP address—great stuff! Now you know where you are, although hopefully this wasn't news to you. It isn't going to be practical for you to do this manually in the browser for every user. Given that, we're going to use the Python requests module to make the same call and collect the information for us.

## Using Python to Call APIs

```python
import requests
key = "YOUR-API-KEY"
ip = "YOUR-IP-ADDRESS"
url = "http://api.ipstack.com/" + ip +"?access_key=" + key
response = requests.get(url).json()
print(response)
```

Here, I'm declaring the key and IP address as variables and building up the URL using those components. I then use the requests module to carry out an HTTP request on that URL and convert the response to a JSON array. In Python, this is a dictionary, so you'll be able to access any of the individual pieces of information by adding the key name. For example, response['country_name'] will tell you what country the IP address is based in.

If this was part of a larger application, I'd want to declare the key in a configuration file instead of cluttering up this code. Also, I'd like a function to pass the IP address to and get some information back. You can see from the response all of the information that you could get, but for my purposes, I'm going to get the longitude and latitude of the city closest to the IP address. I'll improve the code above by using a function.

```python
def lng_lat_from_ip(ip):
    url = "http://api.ipstack.com/" + ip + "?access_key=" + key
    response = requests.get(url).json()
    return (response['longitude'], response['latitude'])
longitude, latitude = lng_lat_from_ip(ip)
```

Awesome! Now I have a function that can take the IP address and return the map coordinates. You can alter this function to return any of the keys that you'd prefer to discover or use.

## How Far Is That From You?

Once you have the user's location, you can decide how you might adapt their experience. You may store their user data differently, or you may want to do something more fun.
I'm going to work out how far my users are from me. To do that, I'm going to use a module called geopy. Let's install it!

`pip install geopy --user`

Once you've installed the module, you can use it straight away. You don't need to sign up for a service to access this functionality. I'm based in Brighton, England. I'm going to use my details to find out how far my users are from here.

```python
from geopy.distance import geodesic
Brighton = (longitude, latitude) # I used our function above to get this.
cleveland_oh = (41.499498, -81.695391) # I looked this one up.
print(geodesic(Brighton, cleveland_oh).miles)
```

This will print the distance in miles from Brighton to Cleveland. You can change the units to meters or feet if that's more relevant. I can now let a user from Cleveland know that I am 8,336 miles away from them. You can read more about the other possibilities in the documentation. There are two ways to measure distance implemented—geodesic and great-circle—and the documentation discusses them both. In my use case, there was no difference, but you may find that one is better than the other and you need the increased accuracy.

## What's Going on There?

Another free and useful service that you can sign up for, GeoNames, allows you to access a wide variety of location-based data. The daily call limit to this service is 20,000, so this should be more than enough for any use case. One thing to look out for is that once you've registered, you need to enable "Free Web Services." This is a link at the bottom of the login page.

I find this to be a really useful service and have used it to tell the weather where my users are and even find some interesting local Wikipedia articles.

Let's find out what the weather is like. We'll start, as before, with testing in our browser, and then we can write the Python function to do the heavy lifting for us.

`http://api.geonames.org/findNearByWeatherJSON?lat=<YOUR-LAT>&lng=<YOUR-LNG>&username=<YOURUSERNAME>`
The good thing is, you have a function to find your latitude and longitude from your IP address, so you can use that to gather the information. According to the weather information, there are few clouds where I am.
By now, you can probably write the function yourself to carry this out for you. I'm going to construct the URL, use the requests module to make the call, and then return the output.

```python
import requests
username = "YOUR USERNAME"

def weather_from_lat_lng(lat, lng):
    url="http://api.geonames.org/findNearByWeatherJSON?lat=" + lat + "&lng=" + lng + "&username=" + username
    response = requests.get(url).json()
    return response

print(weather_from_lat_lng("41.499498", "-81.695391"))
```

As before, I'm declaring my username in code here, which isn't a best practice. You could use separate configuration files or even environment variables to keep your keys safe. You can call this function and give a visual indication of cloud cover on your site. Or, less frivolously, you could track if there's any correlation between the weather and use of your application.

## Where Next?

I've just scratched the surface of the things you can do with geolocation in this guide. The GeoNames library has a lot of free services I haven't mentioned here, but the documentation is good and you've got everything you need in this guide to be able to leverage them in your applications.

If you're collecting logs and metrics with a service such as Retrace, this location data would be useful to gather. You can see if there's a spike in location-specific traffic at unusual times. This can allow you to track down problems or security issues more quickly.
