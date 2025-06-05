// api/submit.js
import { Octokit } from "octokit";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

const owner = "kakacordovil";         
const repo = "200anos";                
const filePath = "data/services.json";      
const baseBranch = "main";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send({ message: "Só aceitamos POST aqui 🥲" });
  }

  const newService = req.body;

  // 1. Obtem o conteúdo atual do JSON
  const { data: file } = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner,
    repo,
    path: filePath,
    ref: baseBranch
  });

  const content = Buffer.from(file.content, 'base64').toString();
  const json = JSON.parse(content);

  // 2. Adiciona novo item
  json.push(newService);

  const updatedContent = Buffer.from(JSON.stringify(json, null, 2)).toString('base64');

  const branchName = `add-${newService.name.toLowerCase().replace(/\s/g, "-")}-${Date.now()}`;

  // 3. Cria novo branch
  const { data: base } = await octokit.rest.git.getRef({
    owner,
    repo,
    ref: `heads/${baseBranch}`
  });

  await octokit.rest.git.createRef({
    owner,
    repo,
    ref: `refs/heads/${branchName}`,
    sha: base.object.sha
  });

  // 4. Commita a alteração no novo branch
  await octokit.rest.repos.createOrUpdateFileContents({
    owner,
    repo,
    path: filePath,
    message: `add: nova prestadora - ${newService.name}`,
    content: updatedContent,
    sha: file.sha,
    branch: branchName
  });

  // 5. Abre Pull Request
  await octokit.rest.pulls.create({
    owner,
    repo,
    title: `Nova prestadora: ${newService.name}`,
    head: branchName,
    base: baseBranch,
    body: `Esta PR adiciona ${newService.name} à lista de serviços 💛`
  });

  res.status(200).json({ message: "Pull request criada com sucesso!" });
}