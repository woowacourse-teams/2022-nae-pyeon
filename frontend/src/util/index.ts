const divideArrayByIndexRemainder = (array: any[], divisor: number) => {
  const result: any[][] = Array.from({ length: divisor }, () => []);

  array.forEach((element, index) => {
    result[index % divisor].push(element);
  });

  return result;
};

export { divideArrayByIndexRemainder };
