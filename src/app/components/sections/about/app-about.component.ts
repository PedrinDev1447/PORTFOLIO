import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ServiceDetail {
  id: string;
  title: string;
  icon: string;
  iconColor: string;
  description: string;
  skills: Skill[];
}

interface Skill {
  name: string;
  level: number; // 0-100
  description: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-about.component.html',
  styleUrls: ['./app-about.component.scss']
})
export class AboutComponent {
  
  isModalOpen = false;
  selectedService: ServiceDetail | null = null;

  // Dados detalhados de cada serviço
  services: ServiceDetail[] = [
    {
      id: 'backend',
      title: 'Desenvolvimento Backend',
      icon: 'ph-duotone ph-database',
      iconColor: 'blue',
      description: 'Desenvolvimento de APIs REST robustas e escaláveis, com foco em performance, segurança e boas práticas de arquitetura.',
      skills: [
        { name: 'Java', level: 85, description: 'Spring Boot, Spring Data JPA, Hibernate, Maven. Desenvolvimento de APIs RESTful e microsserviços.' },
        { name: 'Spring Boot', level: 80, description: 'Criação de APIs, autenticação JWT, integração com bancos de dados, Flyway migrations.' },
        { name: 'Python', level: 75, description: 'Django, Flask, FastAPI. Scripts de automação e integração com APIs externas.' },
        { name: 'Node.js', level: 70, description: 'Express, APIs REST, integração com MongoDB e PostgreSQL.' },
        { name: 'PostgreSQL', level: 80, description: 'Modelagem de dados, queries otimizadas, índices, procedures e triggers.' }
      ]
    },
    {
      id: 'frontend',
      title: 'Interfaces Modernas',
      icon: 'ph-duotone ph-browser',
      iconColor: 'purple',
      description: 'Criação de interfaces responsivas, acessíveis e com experiência do usuário otimizada usando frameworks modernos.',
      skills: [
        { name: 'Angular', level: 80, description: 'Componentes standalone, RxJS, Angular Material, formulários reativos.' },
        { name: 'React', level: 75, description: 'Hooks, Context API, styled-components, integração com APIs REST.' },
        { name: 'TypeScript', level: 85, description: 'Tipagem avançada, interfaces, generics, decorators.' },
        { name: 'HTML/CSS', level: 90, description: 'Semântica, acessibilidade, Flexbox, Grid, animações CSS.' },
        { name: 'SCSS', level: 85, description: 'Variáveis, mixins, funções, arquitetura modular de estilos.' }
      ]
    },
    {
      id: 'devops',
      title: 'DevOps & Cloud',
      icon: 'ph-duotone ph-cloud',
      iconColor: 'teal',
      description: 'Containerização, automação de deploys e infraestrutura como código para ambientes escaláveis.',
      skills: [
        { name: 'Docker', level: 80, description: 'Criação de Dockerfiles, docker-compose, multi-stage builds.' },
        { name: 'Git/GitHub', level: 90, description: 'Branching strategies, Git Flow, Pull Requests, Actions.' },
        { name: 'CI/CD', level: 70, description: 'GitHub Actions, pipelines automatizados, deploy contínuo.' },
        { name: 'Linux', level: 75, description: 'Administração básica, scripts Bash, gerenciamento de serviços.' }
      ]
    },
    {
      id: 'database',
      title: 'Banco de Dados',
      icon: 'ph-duotone ph-hard-drives',
      iconColor: 'amber',
      description: 'Modelagem eficiente, queries otimizadas e migrations automatizadas para SQL e NoSQL.',
      skills: [
        { name: 'PostgreSQL', level: 85, description: 'Modelagem relacional, índices, views, funções, otimização de queries.' },
        { name: 'MySQL', level: 80, description: 'CRUD, joins complexos, stored procedures, triggers.' },
        { name: 'MongoDB', level: 70, description: 'Modelagem de documentos, aggregation pipeline, índices.' },
        { name: 'Flyway', level: 75, description: 'Migrations automatizadas, versionamento de schema, rollbacks.' },
        { name: 'SQL', level: 85, description: 'Queries avançadas, subqueries, CTEs, window functions.' }
      ]
    },
    {
      id: 'automation',
      title: 'Automação & IA',
      icon: 'ph-duotone ph-robot',
      iconColor: 'rose',
      description: 'Scripts automatizados e integração de IA generativa para otimizar processos repetitivos.',
      skills: [
        { name: 'Python', level: 80, description: 'Scripts de automação, web scraping, processamento de dados.' },
        { name: 'Node-RED', level: 85, description: 'Fluxos de automação IoT, integração com APIs, dashboards.' },
        { name: 'IA Generativa', level: 70, description: 'Integração com APIs de IA, prompt engineering, chatbots.' },
        { name: 'Selenium', level: 65, description: 'Automação de testes, web scraping, RPA básico.' },
        { name: 'APIs REST', level: 85, description: 'Consumo e integração de APIs externas, webhooks.' }
      ]
    },
    {
      id: 'consulting',
      title: 'Consultoria Técnica',
      icon: 'ph-duotone ph-chats-circle',
      iconColor: 'emerald',
      description: 'Análise de arquitetura, code review e mentoria para decisões tecnológicas estratégicas.',
      skills: [
        { name: 'Arquitetura', level: 75, description: 'Design de sistemas, padrões de projeto, microsserviços, monolitos.' },
        { name: 'Code Review', level: 80, description: 'Análise de código, identificação de problemas, sugestões de melhoria.' },
        { name: 'Metodologias Ágeis', level: 85, description: 'Scrum, Kanban, sprints, daily meetings, retrospectivas.' },
        { name: 'Documentação', level: 80, description: 'README, Swagger/OpenAPI, diagramas, wikis técnicas.' },
        { name: 'Mentoria', level: 75, description: 'Orientação técnica, pair programming, transferência de conhecimento.' }
      ]
    }
  ];

  openModal(serviceId: string): void {
    this.selectedService = this.services.find(s => s.id === serviceId) || null;
    if (this.selectedService) {
      this.isModalOpen = true;
      document.body.style.overflow = 'hidden';
    }
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedService = null;
    document.body.style.overflow = '';
  }

  // Fecha modal ao clicar fora
  onOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.closeModal();
    }
  }

  // Fecha modal com ESC
  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.closeModal();
    }
  }
}
