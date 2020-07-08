import { mean } from "d3-array";
import * as distances from "./distances";

//  K-means clustering
export default () => {
  let maxIters = 300;
  let distance: any;
  let centroids: any;

  const km = {
    centroids(x: any) {
      if (!arguments.length) return centroids;
      centroids = x;
      return km;
    },

    maxIters(...x: number[]) {
      if (!x.length) return maxIters;
      maxIters = +x[0];
      return km;
    },

    distance(...d: any[]) {
      if (!d.length) return distance;
      let di: any = d[0] || "euclidean";
      if (typeof di == "string") di = (distances as any)[di];
      distance = di;
      return km;
    },

    // create a set of random centroids from a set of points
    randomCentroids(points: any, K: number) {
      const means = points.slice(0); // copy
      means.sort(function () {
        return Math.round(Math.random()) - 0.5;
      });
      return means.slice(0, K);
    },

    classify(point: any) {
      let min = Infinity,
        index = 0,
        i,
        dist;

      for (i = 0; i < centroids.length; i++) {
        dist = distance(point, centroids[i]);
        if (dist < min) {
          min = dist;
          index = i;
        }
      }
      return index;
    },

    cluster(points: any, callback: any) {
      const N = points.length;
      let iterations = 0,
        movement = true,
        newCentroids,
        n,
        k;

      if (!centroids) {
        centroids = km.randomCentroids(points, N);
        km.centroids(centroids);
      }

      const K = centroids.length,
        clusters = new Array(K);

      if (N < K)
        throw Error(
          "Number of points less than the number of clusters in K-means classification"
        );

      while (movement && iterations < km.maxIters()) {
        movement = false;
        ++iterations;

        // Assignments
        for (k = 0; k < K; ++k)
          clusters[k] = {
            centroid: centroids[k],
            points: [],
            indices: [],
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

        if (callback) callback(clusters, iterations);
      }

      return clusters;
    },
  };

  return km.distance("euclidean");
};
