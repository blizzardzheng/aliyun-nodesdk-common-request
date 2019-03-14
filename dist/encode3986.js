"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(string) {
    return encodeURIComponent(string).replace(/[!'()*]/g, function (c) {
        return '%' + c.charCodeAt(0).toString(16).toUpperCase();
    });
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb2RlMzk4Ni5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2xpYi9lbmNvZGUzOTg2LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsbUJBQXlCLE1BQU07SUFDN0IsT0FBTyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQztRQUMvRCxPQUFPLEdBQUcsR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUMxRCxDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUM7QUFKRCw0QkFJQyJ9