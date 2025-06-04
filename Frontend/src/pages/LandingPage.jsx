import { Link } from "../components/ui/Link"
import { Button } from "../components/ui/Button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/Card"
import { CheckCircle, Code, Trophy, Users, BookOpen, Zap, Github, Twitter, Linkedin } from "lucide-react"
import useStore from "../store/useStore"
import {TypeAnimation} from 'react-type-animation'

function App() {
  const { isMenuOpen, setMenuOpen } = useStore();

  const images = {
  img1: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
  img2: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=60&h=60&fit=crop&crop=face",
  img3: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
  img4: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face"
};


  return (
    <div className="flex min-h-screen flex-col w-full">
      <header className=" sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Code className="h-6 w-6" />
            <span className="text-xl font-bold">AlgoPundit</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium transition-colors hover:text-primary">
              Features
            </Link>
            <Link href="#testimonials" className="text-sm font-medium transition-colors hover:text-primary">
              Testimonials
            </Link>
            <Link href="#pricing" className="text-sm font-medium transition-colors hover:text-primary">
              Pricing
            </Link>
            {/* <Link href="#faq" className="text-sm font-medium transition-colors hover:text-primary">
              FAQ
            </Link> */}
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium transition-colors hover:text-primary">
              Log in
            </Link>
            <Button>
              <Link href="/signup">Sign up</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative w-full overflow-hidden bg-black py-12 md:py-24 lg:py-32 xl:py-48">
           <div className="absolute inset-0 z-0 opacity-20">
              <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-purple-600 blur-[100px]" />
              <div className="absolute right-1/4 bottom-1/4 h-64 w-64 rounded-full bg-blue-600 blur-[100px]" />
            </div>
                  {/* Code particles */}
      <div className="absolute inset-0 z-0 opacity-10">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-green-500 text-opacity-30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`,
              fontSize: `${Math.random() * 14 + 8}px`,
            }}
          >
            {
              ["{", "}", "(", ")", ";", "=", "==", ">=", "<=", "&&", "||", "++", "--", "+=", "-="][
                Math.floor(Math.random() * 15)
              ]
            }
          </div>
        ))}
      </div>
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-flex items-center rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-sm font-semibold text-purple-400 backdrop-blur-sm">
                <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-purple-400"></span>
                New Features
              </div>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    <TypeAnimation
                     sequence={[
                         'Master Algorithms & Ace Your Coding Interviews', 
                         1000,
                       ]}
                       wrapper="span"
                       cursor={true}
                       repeat={Infinity}
                   />
                   <div className="h-5 invisible">
                       Master Algorithms & Ace Your Coding Interviews
                   </div>
                    </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    AlgoPundit helps you prepare for technical interviews with thousands of coding challenges, real-time
                    competitions, and detailed explanations.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg">
                    <Link href="/signup">Start Coding Now</Link>
                  </Button>
                  <Button size="lg" variant="outline">
                    <Link href="/explore">Explore Challenges</Link>
                  </Button>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>2,500+ Problems</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Weekly Contests</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Interview Prep</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center">
              <div className="flex -space-x-2">
                {Object.values(images).map((image,index) => (
                  <div
                    key={index}
                    className="h-8 w-8 rounded-full border-2 border-black bg-gradient-to-br from-purple-400 to-blue-400"
                  >
                    <img src={image} alt="" className="w-full h-full object-cover rounded-full" />
                  </div>
                ))}
              </div>
              <p className="ml-3 text-sm text-gray-400">
                <span className="font-bold text-white">2,000+</span> developers joined this week
              </p>
            </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-[500px] overflow-hidden rounded-lg border bg-background p-2 shadow-xl">
                  <div className="flex items-center border-b bg-muted/50 px-3 py-2">
                    <div className="flex gap-1">
                      <div className="h-2 w-2 rounded-full bg-red-500" />
                      <div className="h-2 w-2 rounded-full bg-yellow-500" />
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                    </div>
                    <div className="ml-2 text-xs font-medium">Two Sum - AlgoPundit</div>
                  </div>
                  <div className="p-4 text-sm">
                    {/* <pre className="overflow-x-auto rounded bg-black p-4 text-xs text-green-600">
                      <code className="language-javascript">
                        {`function twoSum(nums, target) {
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    
    map.set(nums[i], i);
  }
  
  return null;
}`}
                      </code>
                    </pre> */}
                    <pre className="relative overflow-x-auto rounded bg-gray-950 p-4 text-xs font-mono">
                  <div className="absolute right-2 top-2 flex space-x-1 text-xs text-gray-600">
                    <span className="rounded bg-gray-800 px-1.5 py-0.5 text-gray-400">JavaScript</span>
                  </div>
                  <code className="language-javascript text-green-500">
                    <span className="text-blue-400">function</span> <span className="text-yellow-300">twoSum</span>
                    <span className="text-gray-400">(</span>
                    <span className="text-purple-400">nums</span>, <span className="text-purple-400">target</span>
                    <span className="text-gray-400">) {"{"}</span>
                    <br />
                    {"  "}
                    <span className="text-blue-400">const</span> map <span className="text-gray-400">=</span>{" "}
                    <span className="text-blue-400">new</span> <span className="text-yellow-300">Map</span>
                    <span className="text-gray-400">();</span>
                    <br />
                    {"  "}
                    <br />
                    {"  "}
                    <span className="text-blue-400">for</span> <span className="text-gray-400">(</span>
                    <span className="text-blue-400">let</span> i <span className="text-gray-400">=</span>{" "}
                    <span className="text-orange-400">0</span>; i <span className="text-gray-400">&lt;</span> nums.
                    <span className="text-blue-400">length</span>; i<span className="text-gray-400">++</span>
                    <span className="text-gray-400">) {"{"}</span>
                    <br />
                    {"    "}
                    <span className="text-blue-400">const</span> complement <span className="text-gray-400">=</span>{" "}
                    target <span className="text-gray-400">-</span> nums[i];
                    <br />
                    {"    "}
                    <br />
                    {"    "}
                    <span className="text-blue-400">if</span> <span className="text-gray-400">(</span>map.
                    <span className="text-yellow-300">has</span>
                    <span className="text-gray-400">(</span>complement<span className="text-gray-400">)</span>
                    <span className="text-gray-400">) {"{"}</span>
                    <br />
                    {"      "}
                    <span className="text-blue-400">return</span> [map.<span className="text-yellow-300">get</span>
                    <span className="text-gray-400">(</span>complement<span className="text-gray-400">)</span>, i];
                    <br />
                    {"    "}
                    <span className="text-gray-400">{"}"}</span>
                    <br />
                    {"    "}
                    <br />
                    {"    "}map.<span className="text-yellow-300">set</span>
                    <span className="text-gray-400">(</span>nums[i], i<span className="text-gray-400">);</span>
                    <br />
                    {"  "}
                    <span className="text-gray-400">{"}"}</span>
                    <br />
                    {"  "}
                    <br />
                    {"  "}
                    <span className="text-blue-400">return</span> <span className="text-orange-400">null</span>;
                    <br />
                    <span className="text-gray-400">{"}"}</span>
                  </code>
                </pre>
                    <div className="mt-4 flex items-center justify-between">
                      <Button size="sm" variant="outline">
                        Run Code
                      </Button>
                      <Button size="sm">Submit Solution</Button>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </section>
          
          {/* features */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-black overflow-hidden">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <span className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                 ✨ Features
                </span>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Everything You Need to Excel</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  AlgoPundit provides all the tools you need to become a better programmer and ace your technical
                  interviews.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <Card className="transition-transform duration-300 hover:-translate-y-3 hover:shadow-lg">
                <CardHeader>
                  <div className="p-2 bg-primary/10 w-fit rounded-lg mb-4">
                    <Code className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle>2,500+ Coding Problems</CardTitle>
                  <CardDescription>
                    Practice with a vast library of problems ranging from easy to hard difficulty levels.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Categorized by topics and companies</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Multiple difficulty levels</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Detailed explanations and solutions</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="transition-transform duration-300 hover:-translate-y-3 hover:shadow-lg">
                <CardHeader>
                  <div className="p-2 bg-primary/10 w-fit rounded-lg mb-4">
                    <Trophy className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Weekly Competitions</CardTitle>
                  <CardDescription>
                    Test your skills against other programmers in timed coding contests.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Global leaderboards</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Timed challenges</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Win prizes and recognition</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="transition-transform duration-300 hover:-translate-y-3 hover:shadow-lg">
                <CardHeader>
                  <div className="p-2 bg-primary/10 w-fit rounded-lg mb-4">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Learning Paths</CardTitle>
                  <CardDescription>
                    Follow structured learning paths to master specific topics and algorithms.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Structured curriculum</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Video explanations</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Progress tracking</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="transition-transform duration-300 hover:-translate-y-3 hover:shadow-lg">
                <CardHeader>
                  <div className="p-2 bg-primary/10 w-fit rounded-lg mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Mock Interviews</CardTitle>
                  <CardDescription>
                    Practice real interview scenarios with peer-to-peer mock interviews.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Peer-to-peer practice</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Company-specific questions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Detailed feedback</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="transition-transform duration-300 hover:-translate-y-3 hover:shadow-lg">
                <CardHeader>
                  <div className="p-2 bg-primary/10 w-fit rounded-lg mb-4">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Performance Analytics</CardTitle>
                  <CardDescription>Track your progress with detailed analytics and insights.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Skill assessment</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Progress tracking</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Personalized recommendations</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="transition-transform duration-300 hover:-translate-y-3 hover:shadow-lg">
                <CardHeader>
                  <div className="p-2 bg-primary/10 w-fit rounded-lg mb-4">
                    <Code className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Multi-language Support</CardTitle>
                  <CardDescription>
                    Code in your preferred programming language with support for 20+ languages.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Python, Java, JavaScript, C++</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Language-specific tips</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Syntax highlighting</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
       
       {/* testimonials */}
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-gray-950">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <span className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                  ✨ Testimonials
                </span>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Success Stories</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  See how AlgoPundit has helped developers land their dream jobs at top tech companies.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-6xl gap-8 py-12 lg:grid-cols-3">
              <Card className="border group relative shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 backdrop-blur-sm overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-purple-950 to-black rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              <div className="absolute inset-[1px] rounded-lg -z-10" />
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <img
                      src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=60&h=60&fit=crop&crop=face"
                      alt="User avatar"
                      className="w-15 h-15 rounded-full"
                    />
                    <div>
                      <CardTitle className="text-lg">Sarah Johnson</CardTitle>
                      <CardDescription>Software Engineer at Google</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    "AlgoPundit was instrumental in my preparation for Google interviews. The platform's vast problem
                    set and weekly contests helped me develop the problem-solving skills needed to succeed."
                  </p>
                </CardContent>
              </Card>
              <Card className="border group relative shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 backdrop-blur-sm overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-purple-950 to-black rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              <div className="absolute inset-[1px] rounded-lg -z-10" />
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face"
                      alt="User avatar"
                      className="w-15 h-15 rounded-full"
                    />
                    <div>
                      <CardTitle className="text-lg">Michael Chen</CardTitle>
                      <CardDescription>Senior Developer at Amazon</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    "I practiced on AlgoPundit for 3 months before my Amazon interview. The structured learning paths
                    and detailed explanations helped me understand complex algorithms and ace my technical rounds."
                  </p>
                </CardContent>
              </Card>
              <Card className="border group relative  shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 backdrop-blur-sm overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-purple-950 to-black rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                <div className="absolute inset-[1px] rounded-lg -z-10" />
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <img
                      src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face"
                      alt="User avatar"
                      className="w-15 h-15 rounded-full"
                    />
                    <div>
                      <CardTitle className="text-lg">Priya Patel</CardTitle>
                      <CardDescription>Software Developer at Microsoft</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    "The mock interviews on AlgoPundit gave me the confidence I needed for my Microsoft interview. The
                    platform's performance analytics helped me identify and improve my weak areas."
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

         {/* pricing */}
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-black relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20" />
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <span className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                 ✨ Pricing
                </span>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Choose Your Plan</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Flexible pricing options to suit your needs. Start for free or unlock premium features.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-6xl gap-8 py-12 lg:grid-cols-3">
              <Card className="border border-gray-800 bg-gray-900/50 backdrop-blur-sm shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 hover:scale-105 hover:border-gray-700">
                <CardHeader className="text-center pb-8">
                  <CardTitle>Free</CardTitle>
                  <div className="text-3xl font-bold">$0</div>
                  <CardDescription>Perfect for beginners</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-md">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Access to 100+ problems</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Basic code editor</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Community forum access</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="outline">
                    <Link href="/signup">Get Started</Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card className="border-2 border-blue-900 bg-gradient-to-b from-purple-900/30 to-blue-900/30 backdrop-blur-sm shadow-2xl hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium">
                  Popular
                </div>
                <CardHeader className="text-center pb-8">
                  <CardTitle>Pro</CardTitle>
                  <div className="text-3xl font-bold">$19</div>
                  <CardDescription>Per month, billed annually</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-md">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Access to all 2,500+ problems</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Advanced code editor</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Detailed solutions & explanations</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Learning paths</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Performance analytics</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    <Link href="/signup">Subscribe Now</Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card className="border border-gray-800 bg-gray-900/50 backdrop-blur-sm shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 hover:scale-105 hover:border-gray-700">
                <CardHeader className="text-center pb-8">
                  <CardTitle>Enterprise</CardTitle>
                  <div className="text-3xl font-bold">Custom</div>
                  <CardDescription>For teams and organizations</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-md">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Everything in Pro</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Team management</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Custom problem sets</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Dedicated support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>SSO & advanced security</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="outline">
                    <Link href="/contact-sales">Contact Sales</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* <section id="faq" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                  FAQ
                </span>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Frequently Asked Questions</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Find answers to common questions about AlgoPundit.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>How does AlgoPundit differ from other coding platforms?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    AlgoPundit focuses on interview preparation with a comprehensive approach that includes structured
                    learning paths, mock interviews, and detailed explanations. Our platform is designed to not just
                    test your coding skills but to help you understand the underlying concepts.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Can I use AlgoPundit if I'm a beginner?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    AlgoPundit offers problems for all skill levels, from beginner to advanced. Our structured learning
                    paths can help you build your skills from the ground up, with detailed explanations and step-by-step
                    guides.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>How often are new problems added?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We add new problems weekly, including questions from recent interviews at top tech companies. Our
                    team also creates special problem sets for upcoming coding competitions and seasonal challenges.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Can I cancel my subscription anytime?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Yes, you can cancel your subscription at any time. If you cancel, you'll continue to have access to
                    Pro features until the end of your billing period. We also offer a 7-day money-back guarantee for
                    new subscribers.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Do you offer mock interviews?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Yes, AlgoPundit Pro includes access to our peer-to-peer mock interview platform. You can practice
                    with other users in a realistic interview setting, or use our AI-powered interview simulator for
                    solo practice.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Which programming languages are supported?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    AlgoPundit supports over 20 programming languages, including Python, Java, C++, JavaScript,
                    TypeScript, Go, Ruby, Swift, and more. Our code editor includes syntax highlighting and
                    language-specific features.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section> */}

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-950">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Ace Your Next Interview?
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of developers who have landed jobs at top tech companies with AlgoPundit.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg">
                  <Link href="/signup">Start Coding Now</Link>
                </Button>
                <Button size="lg" variant="outline">
                  <Link href="/pricing">View Pricing</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t py-6 md:py-0 bg-black">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Code className="h-6 w-6" />
            <p className="text-sm font-medium">AlgoPundit &copy; {new Date().getFullYear()}</p>
          </div>
          <div className="flex gap-4">
            <Link href="https://github.com/sourav-sm" target="_blank" className="transition transform hover:-translate-y-1 hover:text-white">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link href="https://x.com/Sourav44281219" target="_blank"  className="transition transform hover:-translate-y-1 hover:text-white">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="https://www.linkedin.com/in/sourav-mohanta-756815223/" target="_blank" className="transition transform hover:-translate-y-1 hover:text-white">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>
          <nav className="flex gap-4 text-sm">
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              Terms of Service
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

export default App
