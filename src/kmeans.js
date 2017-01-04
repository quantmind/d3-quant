import {mean} from 'd3-array';

import * as distances from './distances';


//  K-means clustering
export default function () {
    var maxIters = 300,
        distance,
        centroids;

    var km = {
        centroids (x) {
            if (!arguments.length) return centroids;
            centroids = x;
            return km;
        },

        maxIters (x) {
            if (!arguments.length) return maxIters;
            maxIters = +x;
            return km;
        },

        distance (_) {
            if (!arguments.length) return distance;
            _ = _ || "euclidean";
            if (typeof _ == "string") _ = distances[_];
            distance = _;
            return km;
        },

        // create a set of random centroids from a set of points
        randomCentroids (points, K) {
            var means = points.slice(0); // copy
            means.sort(function () {
                return Math.round(Math.random()) - 0.5;
            });
            return means.slice(0, K);
        },

        classify (point) {
            let min = Infinity,
                index = 0,
                i, dist;

            for (i = 0; i < centroids.length; i++) {
                dist = distance(point, centroids[i]);
                if (dist < min) {
                    min = dist;
                    index = i;
                }
            }
            return index;
        },

        cluster (points, callback) {

            var iterations = 0,
                movement = true,
                N = points.length,
                newCentroids,
                n, k;

            if (!centroids) {
                centroids = km.randomCentroids(points, N);
                km.centroids(centroids);
            }

            let K = centroids.length,
                clusters = new Array(K);

            if (N < K)
                throw Error('Number of points less than the number of clusters in K-means classification');

            while (movement && iterations < km.maxIters()) {
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
                    k = km.classify(points[n]);
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
                        newCentroids = km.randomCentroids(points, K);
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

                km.centroids(centroids);

                if (callback)
                    callback(clusters, iterations);
            }

            return clusters;
        }
    };

    return km.distance('euclidean');
}
