from geopy.geocoders import Nominatim
from geopy import distance
# Import the JSON module
import json
# importing the module
import bisect

# Array of JSON Objects
productsx = [{"name": "HDD", "brand": "Samsung", "price": 100},
            {"name": "Monitor", "brand": "Dell", "price": 120},
            {"name": "Mouse", "brand": "Logitech", "price": 10}]

products = [{"price": {"Daily": "278.00","Monthly": "1,858.00"},
            "image": "admin_3_suction.png","longitude": 100.5863111,"owner_id": 1, "id": 10,"size": "PC-30","function": "test","latitude": 13.856966,"created_date": "null","distance": 10.99},
            {"price": {"Daily": "248.00","Monthly": "1,858.00"},
            "image": "admin_3_suction.png","longitude": 102.325157,"owner_id": 1,"id": 11,"size": "PC-30",
            "function": "test","latitude": 13.24315,"created_date": "null","distance": 198.01},
            {"price": {"Daily": "255.00","Monthly": "1,853.00"},
            "image": "admin_5_long_reach.png","longitude": 100.6403282,"owner_id": 1,"id": 12,"size": "PC-30",
            "function": "test","latitude": 13.9411105,"created_date": "null","distance": 0},]

def sort_ditance(json):
    try:
        return float(json['distance'])
    except KeyError:
        return 0



_list = [{"price": {"Daily": "278.00","Monthly": "1,858.00"},
            "image": "admin_3_suction.png","longitude": 100.5863111,"owner_id": 1, "id": 10,"size": "PC-30","function": "test","latitude": 13.856966,"created_date": "null","distance": 10.99}]
a = {"price": {"Daily": "278.00","Monthly": "1,858.00"},
            "image": "admin_3_suction.png","longitude": 100.5863111,"owner_id": 1, "id": 10,"size": "PC-30","function": "test","latitude": 13.856966,"created_date": "null","distance": 10.99}
b = {"price": {"Daily": "248.00","Monthly": "1,858.00"},
            "image": "admin_3_suction.png","longitude": 102.325157,"owner_id": 1,"id": 11,"size": "PC-30",
            "function": "test","latitude": 13.24315,"created_date": "null","distance": 198.01}
c = {"price": {"Daily": "255.00","Monthly": "1,853.00"},
            "image": "admin_5_long_reach.png","longitude": 100.6403282,"owner_id": 1,"id": 12,"size": "PC-30",
            "function": "test","latitude": 13.9411105,"created_date": "null","distance": 0}

# lines.sort() is more efficient than lines = lines.sorted()
# print(products)
# products.sort(key=sort_ditance, reverse=False)

# print(b['distance'])
# bisect.insort(_list, b['distance'])
# bisect.insort(_list, car[i])
# bisect.insort(_list, car[i])

# printing the list
# print(products)
# Print the original data
# print("The original JSON data:\n{0}".format(products))
# Sort the JSON data based on the value of the brand key
# products.sort(key=lambda x: x["distance"])

# Print the sorted JSON data
# print("The sorted JSON data based on the value of the brand:\n{0}".format(products))

# geocoder = Nominatim(user_agent="i know python")

lat1, long1=(13.941980000000001), (100.64771)
lat2, long2=(13.9411105), (100.6403282)

place1=(lat1,long1)
place2=(lat2,long2)
distance = distance.distance(place1, place2)
print(float("{:.2f}".format(distance.km)))
# print(distance.km)