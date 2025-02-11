const calculateProgress = (buyNo: number, sellNo: number) => {
  const total = buyNo + sellNo;
  if (total === 0) {
    return 0; // Menghindari pembagian dengan nol
  }
  return (buyNo / total) * 100
}


export default calculateProgress