def how_do_you_like_python(sentiment: str) -> str:
  emphasized = emphasize(sentiment)
  return f"I really really {emphasized} it"


def emphasize(src: str) -> str:
  return src.upper()


def factorial(n: int, res=1) -> int:
  return res if n == 1 else factorial(n - 1, n * res)


print(how_do_you_like_python("love"))
print(factorial(10))