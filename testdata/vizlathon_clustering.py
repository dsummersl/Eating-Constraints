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
        # print tag_data
        all_tags = []
        all_urls = []
        for url,tags in tag_data.items():
            all_urls.append(url)
            all_tags.extend(tags)

        all_tags = list(set(all_tags)) # list of all tags in the space (defines the dimensions of this space)
        #print all_tags
        #print len(all_tags)
        #return

        # create vectors for each delicious item (vector derived from its tags)
        numerical_data = []
        for url,tags in tag_data.items():
            v = []
            cnt = 0 
            ranks = {}
            for t in tags:
                # ranke everything by  its ingredient order, since I dont' know the proportions
                # I'm just going to use linear for everyting:
                step = 10 / float(len(tags))
                rank = (len(tags)-cnt)*step
                ranks[t] = rank
                #print "%s: adding %s with %s" % (url,t,rank)
                cnt = cnt + 1
                
            for t in all_tags:
                if t in tags:
                    v.append(ranks[t])
                    #v.append(1)
                else:
                    v.append(0)
            numerical_data.append(tuple(v))
        data = numpy.array(numerical_data)
        
        # cluster the items
        #labels, error, nfound = kcluster(data, nclusters=20, dist='e') # 20 clusters, euclidean distance
        labels, error, nfound = kcluster(data, nclusters=25, dist='b',npass=50)
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
            
        print "Erorr: %s" % error
        print "Products:"
        for cluster_id,urls in clustered_urls.items():
            print "Cluster %s: %s" % (cluster_id,len(urls))
            for u in urls:
              print "    %s" % u
        
        print ""
        print "Tags:"
        for cluster_id,tags in clustered_tags.items():
            print "Cluster %s: %s Tags, %s Products" % (cluster_id,len(tags),len(clustered_urls[cluster_id]))
            for t in list(set(tags)):
                times_used = 0
                for u in clustered_urls[cluster_id]:
                  if t in tag_data[u]:
                      times_used = times_used + 1
                print "%5d: %s" % (times_used,t)
		
		
    def load_link_data(self,filename="ingredientRanks.csv"):
        data = {}

        r = csv.reader(open(filename, 'r'))
        firstRow = True
        for row in r:
            if firstRow:
              firstRow = False
              continue
            # do  no more than the top 5 ingredients?
            if data.has_key(row[0]):
                if len(data[row[0]]) < 4:
                    if row[2] not in data[row[0]]: # several of these ingredients appear multiple times, lets just use the top one.
                        data[row[0]].append(row[2])
            else:
                data[row[0]] = [row[2]]

        return data
        

if __name__ == '__main__':
	t = TagClustering()

