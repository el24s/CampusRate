import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as fs from 'node:fs/promises';
import * as path from 'path';

@Injectable()
export class DatabaseService {
  private readonly filePath = process.env.DATA_FILE_PATH || './data/campus-rate.json';

  private async ensureFileExists() {
    try {
      await fs.access(this.filePath);
    } catch {
      const initialData = { places: [], appreciations: [] };
      
      const dir = path.dirname(this.filePath);
      await fs.mkdir(dir, { recursive: true });
      
      await fs.writeFile(this.filePath, JSON.stringify(initialData, null, 2), 'utf8');
    }
  }

  
  async readDatabase(): Promise<{ places: any[]; appreciations: any[] }> {
    await this.ensureFileExists();

    try {
      const fileContent = await fs.readFile(this.filePath, 'utf8');
      return JSON.parse(fileContent);
    } catch (error) {
      if (error instanceof SyntaxError) {
        throw new InternalServerErrorException(
          'Erreur critique : Le fichier de données JSON est corrompu ou invalide.'
        );
      }
      throw error;
    }
  }

  async writeDatabase(data: { places: any[]; appreciations: any[] }): Promise<void> {
    await this.ensureFileExists();
    await fs.writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf8');
  }
}