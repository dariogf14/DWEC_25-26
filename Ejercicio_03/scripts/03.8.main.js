// main.js

const {
  agregarEmpleado,
  eliminarEmpleado,
  buscarPorDepartamento,
  calcularSalarioPromedio,
  obtenerEmpleadosOrdenadosPorSalario
} = require("./empleados");

// 1. Mostrar empleados iniciales
console.log("👥 Empleados iniciales:");
console.log(obtenerEmpleadosOrdenadosPorSalario());

// 2. Agregar nuevos empleados
agregarEmpleado({ id: 6, nombre: "Pedro Ramírez", departamento: "TI", salario: 3500 });
agregarEmpleado({ id: 7, nombre: "Laura Fernández", departamento: "Marketing", salario: 2900 });

console.log("\n👥 Empleados después de agregar nuevos:");
console.log(obtenerEmpleadosOrdenadosPorSalario());

// 3. Buscar empleados de un departamento
console.log("\n🔎 Empleados del departamento TI:");
console.log(buscarPorDepartamento("TI"));

// 4. Calcular salario promedio
console.log("\n💰 Salario promedio de todos los empleados:");
console.log(calcularSalarioPromedio());

// 5. Eliminar un empleado
console.log("\n🗑 Eliminando empleado con id = 2...");
eliminarEmpleado(2);

console.log("\n👥 Empleados después de la eliminación:");
console.log(obtenerEmpleadosOrdenadosPorSalario());