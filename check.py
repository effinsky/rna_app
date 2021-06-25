from typing import List


class Employee:
  def __init__(self, name: str, position: str, wage: float):
    self.name = name
    self.position = position
    self.wage = wage

  def __repr__(self) -> str:
    return f"Employee::{self.name} {self.position} {self.wage}"


def bubblesort(l: List[Employee]):
  for i in range(len(l)):
    for j in range(len(l) - 1 - i):
      if l[j].wage > l[j + 1].wage:
        l[j], l[j + 1] = l[j + 1], l[j]


e1 = Employee(position="Foreman", name="Jimmy Kruger", wage=43.23)
e2 = Employee(position="Assistant Manager", name="Kevin Olson", wage=34.32)
e3 = Employee(position="Sufferer Majeur", name="Brian Magee", wage=55.43)

employees = [e1, e2, e3]
bubblesort(employees)
print(employees)
