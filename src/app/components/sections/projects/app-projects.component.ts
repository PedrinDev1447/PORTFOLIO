import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  type: string;
  technologies: string[];
  icon: string;
  gradient: string;
  featured: boolean;
  demoUrl?: string;
  demoText?: string;
  repoUrl?: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-projects.component.html',
  styleUrls: ['./app-projects.component.scss']
})
export class ProjectsComponent implements OnInit, OnDestroy {
  
  // Estado do carrossel
  currentSlide = 0;
  isAutoPlaying = true;
  activeFilter = 'all';
  
  private autoPlayInterval: any;

  // Lista de projetos - TODOS OS SEUS PROJETOS
  projects: Project[] = [
    {
      id: 1,
      title: 'VidaChurch',
      description: 'Sistema de Gestão para Comunidade com API RESTful em Spring Boot para gerir membros, eventos e comunicação. Implementação com Spring Data JPA, Hibernate, Flyway para migrations e Docker.',
      category: 'Backend',
      type: 'backend',
      technologies: ['Java', 'Spring Boot', 'Spring Data JPA', 'Flyway', 'Docker', 'MySQL'],
      icon: 'ph ph-users-three',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      featured: true,
      repoUrl: 'https://github.com/PedrinDev1447'
    },
    {
      id: 2,
      title: 'ECO FLUX',
      description: 'Projeto desenvolvido na FIAP em parceria com a Porto Seguro. Site com informações sobre planos de seguros, integração com bots no site e via Telegram para atendimento automatizado.',
      category: 'Full Stack',
      type: 'fullstack',
      technologies: ['Python', 'Java', 'React', 'MySQL', 'API REST', 'Telegram Bot'],
      icon: 'ph ph-leaf',
      gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
      featured: true,
      demoUrl: 'https://www.youtube.com/@PedroLucas-ps1gc',
      demoText: 'Ver Vídeo',
      repoUrl: 'https://github.com/PedrinDev1447'
    },
    {
      id: 3,
      title: 'BIG BLUE',
      description: 'Plataforma de conscientização sobre desmatamento e problemas ecológicos. Projeto focado em educação ambiental com interface interativa e dados sobre impacto ambiental.',
      category: 'Full Stack',
      type: 'fullstack',
      technologies: ['Python', 'Java', 'React', 'MySQL', 'API REST'],
      icon: 'ph ph-tree',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      featured: true,
      demoUrl: 'https://www.youtube.com/@PedroLucas-ps1gc',
      demoText: 'Ver Vídeo',
      repoUrl: 'https://github.com/PedrinDev1447'
    },
    {
      id: 4,
      title: 'MyCMD - Hacktoberfest 2025',
      description: 'Prompt de comando personalizado (CLI) em Java desenvolvido durante o Hacktoberfest 2024. Replica funcionalidades do shell e adiciona comandos customizados para gerenciamento de arquivos e execução de scripts.',
      category: 'Open Source',
      type: 'backend',
      technologies: ['Java', 'CLI/Shell', 'Estruturas de Dados', 'Git', 'GitHub'],
      icon: 'ph ph-terminal',
      gradient: 'linear-gradient(135deg, #232526 0%, #414345 100%)',
      featured: true,
      repoUrl: 'https://github.com/PedrinDev1447'
    },
    {
      id: 5,
      title: 'Automação Residencial - DemasTheater',
      description: 'Sistema de automação de iluminação e segurança residencial/empresarial. Configuração de servidores, câmeras, sonorização e integração com software de automatização.',
      category: 'Automação',
      type: 'automation',
      technologies: ['Node-RED', 'IoT', 'Python', 'Redes', 'Servidores'],
      icon: 'ph ph-house-line',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      featured: true,
      repoUrl: 'https://github.com/PedrinDev1447'
    },
    {
      id: 6,
      title: 'Python para Data Science',
      description: 'Projetos de análise de dados desenvolvidos durante a formação na Alura. Manipulação de datasets, visualização de dados e aplicação de conceitos de ciência de dados.',
      category: 'Data Science',
      type: 'data',
      technologies: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Data Analysis'],
      icon: 'ph ph-chart-line-up',
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      featured: true,
      repoUrl: 'https://github.com/PedrinDev1447'
    },
    {
       id: 7,
      title: 'Site DemasTheater',
      description: 'Criação do site institucional e layouts de documentação para a empresa DemasTheater. Design profissional focado em automação residencial e segurança.',
      category: 'Frontend',
      type: 'fullstack',
      technologies: ['HTML', 'CSS', 'JavaScript', 'UI/UX Design'],
      icon: 'ph ph-globe',
      gradient: 'linear-gradient(135deg, #ee7752 0%, #e73c7e 50%, #23a6d5 100%)',
      featured: true,
      repoUrl: 'https://github.com/PedrinDev1447'
    },
    {
         id: 8,
      title: 'Portfolio Pessoal',
      description: 'Este próprio portfólio! Desenvolvido com Angular 17+, SCSS modular, animações customizadas e design responsivo. Demonstra habilidades em front-end moderno.',
      category: 'Frontend',
      type: 'fullstack',
      technologies: ['Angular', 'TypeScript', 'SCSS', 'Responsive Design'],
      icon: 'ph ph-briefcase',
      gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      featured: true,
      demoUrl: '#',
      demoText: 'Você está aqui!',
      repoUrl: 'https://github.com/PedrinDev1447'
    },
     
    
  ];

  filteredProjects: Project[] = [];

  ngOnInit(): void {
    this.filteredProjects = [...this.projects];
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  // Filtrar projetos
  filterProjects(type: string): void {
    this.activeFilter = type;
    this.currentSlide = 0;
    
    if (type === 'all') {
      this.filteredProjects = [...this.projects];
    } else {
      this.filteredProjects = this.projects.filter(p => p.type === type);
    }
  }

  // Navegação do carrossel
  nextSlide(): void {
    if (this.filteredProjects.length === 0) return;
    this.currentSlide = (this.currentSlide + 1) % this.filteredProjects.length;
  }

  prevSlide(): void {
    if (this.filteredProjects.length === 0) return;
    this.currentSlide = this.currentSlide === 0 
      ? this.filteredProjects.length - 1 
      : this.currentSlide - 1;
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
  }

  // Auto play
  toggleAutoPlay(): void {
    this.isAutoPlaying = !this.isAutoPlaying;
    
    if (this.isAutoPlaying) {
      this.startAutoPlay();
    } else {
      this.stopAutoPlay();
    }
  }

  private startAutoPlay(): void {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  private stopAutoPlay(): void {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }

  // Eventos do carrossel
  onCarouselEnter(): void {
    this.stopAutoPlay();
  }

  onCarouselLeave(): void {
    if (this.isAutoPlaying) {
      this.startAutoPlay();
    }
  }
}
