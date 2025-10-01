import { 
    agregarEmpleado, eliminarEmpleado, buscarPorDepartamento, calcularSalarioPromedio, obtenerEmpleadosOrdenadosPorSalario
} from "./empleados.js";

console.log("=== Gestión de Empleados ===\n");

agregarEmpleado({ nombre: "Laura Sánchez", departamento: "Ventas", salario: 35000 });
agregarEmpleado({ nombre: "Pedro Domínguez", departamento: "Tecnología", salario: 48000 });

console.log("Empleados en el departamento de Tecnología:");
console.log(buscarPorDepartamento("Tecnología"));

console.log("Salario promedio de la empresa:");
console.log(calcularSalarioPromedio());

console.log("Lista de empleados ordenados por salario (mayor a menor):");
console.log(obtenerEmpleadosOrdenadosPorSalario());

console.log("Eliminando empleado con id 3...");
eliminarEmpleado(3);

console.log("Lista de empleados tras la eliminación:");
console.log(obtenerEmpleadosOrdenadosPorSalario());
