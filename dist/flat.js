"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isBuffer = require('is-buffer');
// flatten.flatten = flatte
function flatten(target, opts) {
    opts = opts || {};
    const delimiter = opts.delimiter || '.';
    const maxDepth = opts.maxDepth;
    const output = {};
    function step(object, prev, currentDepth) {
        currentDepth = currentDepth || 1;
        Object.keys(object).forEach(function (key) {
            const value = object[key];
            if (+key >= 0) {
                key = '' + (+key + 1);
            }
            const isarray = opts.safe && Array.isArray(value);
            const type = Object.prototype.toString.call(value);
            const isbuffer = isBuffer(value);
            const isobject = (type === '[object Object]' ||
                type === '[object Array]');
            const newKey = prev
                ? prev + delimiter + key
                : key;
            if (!isarray && !isbuffer && isobject && Object.keys(value).length &&
                (!opts.maxDepth || currentDepth < maxDepth)) {
                return step(value, newKey, currentDepth + 1);
            }
            output[newKey] = encodeURIComponent(value);
        });
    }
    step(target);
    return output;
}
exports.default = flatten;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxhdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2xpYi9mbGF0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFBO0FBRXJDLDJCQUEyQjtBQUMzQixTQUFTLE9BQU8sQ0FBRSxNQUFNLEVBQUUsSUFBSztJQUM3QixJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQTtJQUVqQixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxJQUFJLEdBQUcsQ0FBQTtJQUN2QyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFBO0lBQzlCLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQTtJQUVqQixTQUFTLElBQUksQ0FBRSxNQUFNLEVBQUUsSUFBSyxFQUFFLFlBQWE7UUFDekMsWUFBWSxHQUFHLFlBQVksSUFBSSxDQUFDLENBQUE7UUFDaEMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFHO1lBQ3ZDLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRTtnQkFDYixHQUFHLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUE7YUFDdEI7WUFDRCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7WUFDakQsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO1lBQ2xELE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtZQUNoQyxNQUFNLFFBQVEsR0FBRyxDQUNmLElBQUksS0FBSyxpQkFBaUI7Z0JBQzFCLElBQUksS0FBSyxnQkFBZ0IsQ0FDMUIsQ0FBQTtZQUVELE1BQU0sTUFBTSxHQUFHLElBQUk7Z0JBQ2pCLENBQUMsQ0FBQyxJQUFJLEdBQUcsU0FBUyxHQUFHLEdBQUc7Z0JBQ3hCLENBQUMsQ0FBQyxHQUFHLENBQUE7WUFDUCxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU07Z0JBQ2hFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLFlBQVksR0FBRyxRQUFRLENBQUMsRUFBRTtnQkFDN0MsT0FBTyxJQUFJLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUE7YUFDN0M7WUFFRCxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0MsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBRVosT0FBTyxNQUFNLENBQUE7QUFDZixDQUFDO0FBQ0Qsa0JBQWUsT0FBTyxDQUFDIn0=