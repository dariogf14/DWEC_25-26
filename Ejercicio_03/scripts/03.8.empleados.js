const empleados = [
  { id: 1, nombre: "Ana Pérez", departamento: "Recursos Humanos", salario: 28000 },
  { id: 2, nombre: "Carlos Gómez", departamento: "Tecnología", salario: 45000 },
  { id: 3, nombre: "Lucía Fernández", departamento: "Marketing", salario: 32000 },
  { id: 4, nombre: "David Martínez", departamento: "Ventas", salario: 30000 },
  { id: 5, nombre: "Sofía Ramírez", departamento: "Finanzas", salario: 40000 },
  { id: 6, nombre: "Andrés Torres", departamento: "Tecnología", salario: 47000 },
  { id: 7, nombre: "María López", departamento: "Recursos Humanos", salario: 29000 },
  { id: 8, nombre: "Javier Castro", departamento: "Ventas", salario: 31000 },
  { id: 9, nombre: "Paula Morales", departamento: "Marketing", salario: 33000 },
  { id: 10, nombre: "Miguel Herrera", departamento: "Finanzas", salario: 42000 }
];

function agregarEmpleado(empleado) {
  const nuevoId = empleados.length > 0 ? empleados[empleados.length - 1].id + 1 : 1;
  empleado.id = nuevoId;
  empleados.push(empleado);
  console.log(`Empleado ${empleado.nombre} agregado correctamente.`);
}

function eliminarEmpleado(id) {
  empleados = empleados.filter(emp => emp.id !== id);
  console.log(`Empleado con id ${id} eliminado.`);
}

function buscarPorDepartamento(departamento) {
  return empleados.filter(emp => emp.departamento === departamento);
}

function calcularSalarioPromedio() {
  if (empleados.length === 0) return 0;
  const total = empleados.reduce((acc, emp) => acc + emp.salario, 0);
  return total / empleados.length;
}

function obtenerEmpleadosOrdenadosPorSalario() {
  return [...empleados].sort((a, b) => b.salario - a.salario);
}

export { 
    agregarEmpleado, eliminarEmpleado, buscarPorDepartamento, calcularSalarioPromedio, obtenerEmpleadosOrdenadosPorSalario
};
