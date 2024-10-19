import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const language = request.nextUrl.searchParams.get("language")
  let snippet = 'NOT A SUPPORTED LANGUAGE';

  if(language == 'C') {
    snippet = 'int main() {\n\t printf("hello world\\n"); \n}'
  } else if(language == 'Cpp') {
    snippet = 'int main() {\n\t printf("hello world\\n"); \n}'
  } else if(language === 'Java') {
    snippet = 'class Solution {\n\tpublic static void main(String[] args) {\n\t\t System.out.println("Hello World\\n"); \n\t}\n}'
  } else if(language === 'Python') {
    snippet = 'python'
  } else if(language === 'Javascript') {
    snippet = 'javascript'
  }
  return NextResponse.json({ snippet })
}