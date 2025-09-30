// empleados.js

// Lista inicial de empleados
const empleados = [
  { id: 1, nombre: "Ana Pérez", departamento: "Ventas", salario: 2500 },
  { id: 2, nombre: "Luis Gómez", departamento: "Marketing", salario: 2800 },
  { id: 3, nombre: "María López", departamento: "TI", salario: 3200 },
  { id: 4, nombre: "Carlos Sánchez", departamento: "Ventas", salario: 2300 },
  { id: 5, nombre: "Elena Rodríguez", departamento: "Recursos Humanos", salario: 2700 }
];

// Agregar un empleado
function agregarEmpleado(empleado) {
  empleados.push(empleado);
}

// Eliminar un empleado por ID
function eliminarEmpleado(id) {
  const indice = empleados.findIndex(emp => emp.id === id);
  if (indice !== -1) {
    empleados.splice(indice, 1);
    return true;
  }
  return false;
}

// Buscar empleados por departamento
function buscarPorDepartamento(departamento) {
  return empleados.filter(emp => emp.departamento === departamento);
}

// Calcular salario promedio
function calcularSalarioPromedio() {
  if (empleados.length === 0) return 0;
  const totalSalarios = empleados.reduce((total, emp) => total + emp.salario, 0);
  return totalSalarios / empleados.length;
}

// Obtener empleados ordenados por salario (mayor a menor)
function obtenerEmpleadosOrdenadosPorSalario() {
  return [...empleados].sort((a, b) => b.salario - a.salario);
}

// Exportamos las funciones
module.exports = {
  agregarEmpleado,
  eliminarEmpleado,
  buscarPorDepartamento,
  calcularSalarioPromedio,
  obtenerEmpleadosOrdenadosPorSalario
};