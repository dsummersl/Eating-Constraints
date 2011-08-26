#!/usr/bin/env python
# encoding: utf-8
"""
tag_clustering.py

Created by Hilary Mason on 2011-02-18.
Copyright (c) 2011 Hilary Mason. All rights reserved.
"""

import sys, os
import csv

import numpy
from Pycluster import *

class TagClustering(object):

    def __init__(self):
        tag_data = self.load_link_data()
        all_tags = []
        all_urls = []
        tagsGot = False
        for url,tags in tag_data.items():
            all_urls.append(url)
            if not tagsGot:
                tagsGot = True
                for k,v in tags.items():
                    all_tags.append(k)

        #all_tags = list(set(all_tags)) # list of all tags in the space (defines the dimensions of this space)
        #print all_tags
        #print all_urls
        #print all_tags
        #print tag_data
        #return

        # create vectors for each delicious item (vector derived from its tags)
        numerical_data = []
        for url,tags in tag_data.items():
            v = []
            for t in all_tags:
                if t in tags.keys():
                    v.append(int(tags[t]))
                else:
                    print "bad"
                    return
            numerical_data.append(tuple(v))
            #print v
        data = numpy.array(numerical_data)
        #print data
        #return
        
        # cluster the items
        #labels, error, nfound = kcluster(data, nclusters=20, dist='e') # 20 clusters, euclidean distance
        labels, error, nfound = kcluster(data, nclusters=8, dist='e',npass=20)
        #labels, error, nfound = kcluster(data, nclusters=20, dist='j',npass=10) # 30 clusters, abs val of the correlation distance, iterate 10 times
        #labels, error, nfound = kcluster(data, nclusters=30, dist='a',npass=10) # 30 clusters, abs val of the correlation distance, iterate 10 times
        
        # print out the clusters
        clustered_urls = {}
        clustered_tags = {}
        i = 0
        for url in all_urls:
            clustered_urls.setdefault(labels[i], []).append(url)
            clustered_tags.setdefault(labels[i], []).extend(tag_data[url])
            i += 1
            
        #print "Labels: %s" % labels
        print "#To get a real CSV file, delete all lines that start with #"
        print "#Error: %s" % error
        print "#NFound: %d" % nfound
        print "#Products:"
        titleBar = "cluster,"
        bodyBar = ""
        for u in all_tags:
            titleBar = titleBar + u + ","
            bodyBar = bodyBar +"%("+ u +")2.2f,"
        titleBar = titleBar + "productName"
        bodyBar = bodyBar + ""
        print titleBar
        for cluster_id,urls in clustered_urls.items():
            #print "Cluster %s: %s" % (cluster_id,len(urls))
            for u in urls:
              print "cluster%s,%s\"%s\"" % (cluster_id,self.tags_to_string(bodyBar,tag_data[u]),u)
		
    def tags_to_string(self,bodyBar,dat):
        return bodyBar % dat

    def load_link_data(self,filename="ingredients.csv"):
        data = {}

        r = csv.reader(open(filename, 'r'))
        firstRow = True
        for row in r:
            if firstRow:
              firstRow = False
              continue
            # do  no more than the top 5 ingredients?
            data[row[0]] = {
                "carbs_perc": self.get_x_per_calorie(row,8),
                "sugar_g": self.get_x_per_calorie(row,9),
                "fat_perc": self.get_x_per_calorie(row,13),
                "sfat_perc": self.get_x_per_calorie(row,15),
                "protein_g": self.get_x_per_calorie(row,17),
                "salt_perc": self.get_x_per_calorie(row,19),
                "chol_perc": self.get_x_per_calorie(row,21)
            } 
            #data[row[0]] = {
                #"carbs_cal": self.get_x_per_calorie(row,7),  #carbs_per_calory 
                #"sugar_cal": self.get_x_per_calorie(row,9),  #sugar_per_calory 
                #"fiber_cal": self.get_x_per_calorie(row,10), #fiber_per_calory 
                #"fat_cal": self.get_x_per_calorie(row,12), #fat_per_calory 
                #"sat_fat_cal": self.get_x_per_calorie(row,14), #sat_fat_per_calory 
                #"trans_fat_cal": self.get_x_per_calorie(row,16), #trans_fat_per_calory 
                #"protein_cal": self.get_x_per_calorie(row,17), #protein_per_calory 
                #"sodium_cal": self.get_x_per_calorie(row,18), #sodium_per_calory 
                #"cholesteral_cal": self.get_x_per_calorie(row,20)  #cholesteral_per_calory 
            #} 

        return data

    def get_x_per_calorie(self,row,index,factor=1,percals=100):
        if row[index] == '' or row[5] == '0':
            return 0
        return percals* int(row[index]) / float(factor) / float(row[5])

if __name__ == '__main__':
	t = TagClustering()

