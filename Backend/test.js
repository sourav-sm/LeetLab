const fs=require('fs')

function addTwoNumbers(a,b){
    //write your code
}

const input=fs.readFile(0,"utf-8").trim()

const [a,b]=input.split(" ").map(Number)

console.log(addTwoNumbers(a,b))



// const fs=require('fs')

// function addTwoNumbers(a,b){
//     //write your code
// }

// const input=fs.readFile(0,"utf-8").trim()

// const [a,b]=input.split(" ").map(Number)

// console.log(addTwoNumbers(a,b))

`"codeSnippets": {
    "JAVASCRIPT": "const readline = require('readline');\n\nfunction addTwoNumbers(a, b) {\n    // Write your code here\n    // Return the sum of a and b\n}\n\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nlet inputLines = [];\n\nrl.on('line', (line) => {\n    inputLines = line.split(' ');\n    rl.close();\n}).on('close', () => {\n    const a = parseInt(inputLines[0], 10);\n    const b = parseInt(inputLines[1], 10);\n    console.log(addTwoNumbers(a, b));\n});",
    "PYTHON": "def add_two_numbers(a, b):\n    # Write your code here\n    # Return the sum of a and b\n    pass\n\nimport sys\ninput_line = sys.stdin.read()\na, b = map(int, input_line.split())\nprint(add_two_numbers(a, b))",
    "JAVA": "import java.util.Scanner;\n\npublic class Main {\n    public static int addTwoNumbers(int a, int b) {\n        // Write your code here\n        // Return the sum of a and b\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt();\n        int b = sc.nextInt();\n        System.out.println(addTwoNumbers(a, b));\n    }\n}",
    "CPP": "#include <iostream>\nusing namespace std;\n\nint addTwoNumbers(int a, int b) {\n    // Write your code here\n    // Return the sum of a and b\n    return 0;\n}\n\nint main() {\n    int a, b;\n    cin >> a >> b;\n    cout << addTwoNumbers(a, b) << endl;\n    return 0;\n}"
}`

`"referenceSolutions": {
        "JAVASCRIPT": "const readline = require('readline');\n\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nlet inputLines = [];\n\nrl.on('line', (line) => {\n    inputLines = line.split(' ');\n    rl.close();\n}).on('close', () => {\n    const a = parseInt(inputLines[0], 10);\n    const b = parseInt(inputLines[1], 10);\n    console.log(a + b);\n});",
        "PYTHON": "import sys\ninput_line = sys.stdin.read()\na, b = map(int, input_line.split())\nprint(a + b)",
        "JAVA": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt();\n        int b = sc.nextInt();\n        System.out.println(a + b);\n    }\n}",
        "CPP": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    cin >> a >> b;\n    cout << a + b << endl;\n    return 0;\n}"
}`