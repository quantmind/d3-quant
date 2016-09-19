import {mean} from 'd3-array';

import {self} from './utils';
import * as distances from './distances';


//  K-means clustering
class Kmeans {

    constructor (maxIter, distance) {
        distance = distance || "euclidean";
        if (typeof distance == "string")
            distance = distances[distance];
        self.set(this, {});
        this.maxIters(maxIter || 300);
        this.distance(distance);
    }

    centroids (x) {
        if (!arguments.length) return self.get(this).centroids;
        self.get(this).centroids = x;
        return this;
    }

    maxIters (x) {
        if (!arguments.length) return self.get(this).maxIters;
        self.get(this).maxIters = +x;
        return this;
    }

    distance (x) {
        if (!arguments.length) return self.get(this).distance;
        self.get(this).distance = x;
        return this;
    }

    // create a set of random centroids from a set of points
    randomCentroids (points, K) {
        var means = points.slice(0); // copy
        means.sort(function() {
            return Math.round(Math.random()) - 0.5;
        });
        return means.slice(0, K);
    }

    classify (point) {
        let min = Infinity,
            index = 0,
            i, dist;
        var centroids = this.centroids(),
            distance = this.distance();

        for (i = 0; i < centroids.length; i++) {
            dist = distance(point, centroids[i]);
            if (dist < min) {
                min = dist;
                index = i;
            }
       }
       return index;
    }

    cluster (points, callback) {

        let centroids = this.centroids(),
            iterations = 0,
            movement = true,
            N = points.length,
            newCentroids,
            n, k;

        if (!centroids) {
            centroids = this.randomCentroids(points, N);
            this.centroids(centroids);
        }

        let K = centroids.length,
            clusters = new Array(K);

        if (N < K)
            throw Error('Number of points less than the number of clusters in K-means classification');

        while (movement && iterations < this.maxIters()) {
            movement = false;
            ++iterations;

            // Assignments
            for (k = 0; k < K; ++k)
                clusters[k] = {
                    centroid: centroids[k],
                    points: [],
                    indices: []
                };

            for (n = 0; n < N; n++) {
                k = this.classify(points[n]);
                clusters[k].points.push(points[n]);
                clusters[k].indices.push(n);
            }

            // Update centroids
            newCentroids = [];
            for (k = 0; k < K; ++k) {
                if (clusters[k].points.length)
                    newCentroids.push(mean(clusters[k].points));
                else {
                    // A centroid with no points, randomly re-initialise it
                    newCentroids = this.randomCentroids(points, K);
                    break;
                }
            }

            for (k = 0; k < K; ++k) {
                if (newCentroids[k] != centroids[k]) {
                    centroids = newCentroids;
                    movement = true;
                    break;
                }
            }

            this.centroids(centroids);

            if (callback)
                callback(clusters, iterations);
        }

        return clusters;
    }
}

function kmeans (maxIter, distance) {
    return new Kmeans(maxIter, distance);
}

kmeans.Kmeans = Kmeans;

export default kmeans;
