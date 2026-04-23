var output = "";

for (var i = 1; i <= 5; i++) {
  for (var spasi = 5; spasi > i; spasi--) {
    output += " ";
  }

  for (var bintang = 1; bintang <= i; bintang++) {
    output += "*";
  }

  output += "\n";
}

console.log(output);
